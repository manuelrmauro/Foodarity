const cloudinary = require('cloudinary').v2;
const Donation = require('../models/Donation');
const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');
const { send } = require('./nodemailerController');

cloudinary.config(process.env.CLOUDINARY_URL);

// un comercio puede postear una donacion
const postDonation = async (req, res) => {
  try {
    const { userId } = req;
    const { lote, description, quantity, category } = JSON.parse(req.body.data);
    const { ongId } = req.params;

    // verifica que sea un usuario registrado
    const user = await User.findByPk(userId);
    if (!user.company_id) {
      return res.status(401).json({ msg: 'El usuario no posee un comercio' });
    }

    // verifica que el usuario no sea una ONG
    const commerce = await Company.findByPk(user.company_id);

    if (commerce.company_type_id !== 1) {
      return res.status(401).json({
        msg: 'Solo las companias tipo comercio pueden realizar donaciones',
      });
    }
    if (commerce.status !== 'Habilitada') {
      return res.status(401).json({
        msg: 'Solo los comercios habilitados pueden realizar donaciones',
      });
    }
    // verifica que el id de la ONG pasada por params exista, sea una ONG y este habilitada
    const ong = await Company.findByPk(ongId);
    if (!ong) {
      return res.status(401).json({ msg: 'La ONG no existe' });
    }
    if (ong.company_type_id !== 2) {
      return res
        .status(401)
        .json({ msg: 'Solo las companias tipo ONG pueden recibir donaciones' });
    }
    if (ong.status !== 'Habilitada') {
      return res.status(401).json({
        msg: 'Solo los ONG habilitados pueden recibir donaciones',
      });
    }

    const { tempFilePath } = req.files.file;

    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.uploader.upload(tempFilePath);

    const photo = { public_id: publicId, url: secureUrl };

    const newDonation = await Donation.create({
      lote,
      description,
      quantity,
      photo,
    });

    await newDonation.setCompany(commerce);
    await newDonation.setOng(ong);
    await newDonation.setPublisher(userId);
    await newDonation.setCategory(category);
    await send(
      ong.email,
      'Recibiste una donación!',
      `Acabas de recibir una donacion de ${commerce.name}. Te dejamos sus datos para que se puedan ponen en contacto.\n
    web: ${commerce.website}\n
    email: ${commerce.email}\n
    telefono: ${commerce.areaCode} ${commerce.phone}\n\n
    Podes ver el detalle de tu compra en tu perfil de usuario.`
    );
    await send(
      commerce.email,
      'Realizaste una donación',
      `Acabas de realizar una donacion a ${ong.name}. Te dejamos sus datos para que se puedan ponen en contacto.\n
    web: ${ong.website}\n
    email: ${ong.email}\n
    telefono: ${ong.areaCode} ${ong.phone}\n\n
    Podes ver el detalle de tu compra en tu perfil de usuario.`
    );
    return res.status(200).json(newDonation);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// una ONG puede ver las donaciones recibidas //VER RUTA
const getDonationsByOng = async (req, res) => {
  const ownerId = req.userId;
  try {
    const ong = await Company.findOne({ where: { ownerId } });

    if (!ong) {
      return res.status(401).json({ msg: 'La ONG no existe' });
    }
    if (ong.company_type_id !== 2) {
      return res.status(401).json({
        msg: 'Solo las companias tipo ONG pueden realizar esta accion',
      });
    }
    const listDonations = await Donation.findAll({
      include: [
        { model: Company, as: 'company', attributes: ['id', 'name'] },
        { model: Category, as: 'category', attributes: ['name'] },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['lote', 'ASC']],
      where: {
        ong_id: ong.id,
      },
    });
    return res.status(200).json(listDonations);
  } catch (error) {
    console.log('ERORRR', error);
    return res.status(500).json({ message: error });
  }
};

// un comercio puede ver las donaciones hechas
const getDonationsByCommerce = async (req, res) => {
  const ownerId = req.userId;

  try {
    const commerce = await Company.findOne({ where: { ownerId } });
    if (!commerce) {
      return res.status(401).json({ msg: 'La empresa no existe' });
    }

    if (commerce.company_type_id !== 1) {
      return res.status(401).json({
        msg: 'Solo las empresas pueden realizar esta accion',
      });
    }

    const listDonations = await Donation.findAll({
      include: [
        { model: Company, as: 'ong', attributes: ['id', 'name'] },
        { model: Category, as: 'category', attributes: ['name'] },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['lote', 'ASC']],
      where: {
        commerce_id: commerce.id,
      },
    });
    return res.status(200).json(listDonations);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  postDonation,
  getDonationsByOng,
  getDonationsByCommerce,
};
