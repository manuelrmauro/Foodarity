const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
// eslint-disable-next-line import/no-unresolved
const cloudinary = require('cloudinary').v2;
const Company = require('../models/Company');
const CompanyType = require('../models/CompanyType');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const {send} = require('./nodemailerController')

cloudinary.config(process.env.CLOUDINARY_URL);

// IMPORTANTE: company_id se reemplaza por commerce_id y ong_id, user_id se reemplaza por publisher_id

// crear una empresa
const createCompany = async (req, res) => {
  const { userId } = req;
  const user = User.findByPk(userId);
  if (user.status) {
    res.status(400).json({ message: 'el usuario esta deshabilitado' });
  }
  if (user.company_id) {
    res.status(400).json({ message: 'el usuario ya tiene una compania' });
  }
  try {
    const ownerId = userId;

    const {
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      type,
      street,
      number,
      zipcode,
      cityId,
      stateId,
      location,
    } = req.body;

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* const { tempFilePath } = req.files.file;

    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.uploader.upload(tempFilePath);

    const logo = { public_id: publicId, url: secureUrl }; */

    const newCompany = await Company.create({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      type,
      status: 'Pendiente',
      deleted: false,
      ownerId,
    });

    const newAddress = await Address.create({
      street,
      number,
      zipcode,
      location,
    });
    // primero me formo el objeto de address con state y city  y despues le paso el objeto a la compañia creada
    await newAddress.setState(stateId);
    await newAddress.setCity(cityId);
    await newCompany.setType(type);
    await newCompany.setAddress(newAddress);
    const owner = await User.findByPk(ownerId);
    await owner.setCompany(newCompany.id);
    if (type === 1) {
      send(user.email, 'Registraste un nuevo comercio', `Tu comercio se encuentra en revisión. Recibiras un mail en las siguientes 48 horas para saber si fue aprobado.`)
      send(email, 'Registraste un nuevo comercio', `Tu comercio se encuentra en revisión. Recibiras un mail en las siguientes 48 horas para saber si fue aprobado.`)
    } else {
      send(user.email, 'Registraste una nueva ONG', `Tu ONG se encuentra en revisión. Recibiras un mail en las siguientes 48 horas para saber si fue aprobado.`)
      send(email, 'Registraste un nuevo comercio', `Tu comercio se encuentra en revisión. Recibiras un mail en las siguientes 48 horas para saber si fue aprobado.`)
    }
    
    return res.status(200).json(newCompany);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// obtner info de todas las compañias
const getCompanies = async (req, res) => {
  try {
    const listCompanies = await Company.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        {
          model: Address,
          as: 'address',
          include: [
            { model: City, as: 'city', attributes: ['name','lat', 'lon'] },
            { model: State, as: 'state', attributes: ['name', 'lat', 'lon'] },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (listCompanies.length > 0) {
      return res.status(200).json(listCompanies);
    }
    return res.status(404).json({ msg: 'No se encontraron compañias' });
  } catch (error) {
    return res.status(500);
  }
};

// Obtener todas las company del tipo 2, ONGs

const getAllOngs = async (req, res) => {
  try {
    const listOngs = await Company.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        {
          model: Address,
          as: 'address',
          include: [
            { model: City, as: 'city', attributes: ['name'] },
            { model: State, as: 'state', attributes: ['name'] },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { company_type_id: 2 },
    });

    if (listOngs.length > 0) {
      return res.status(200).json(listOngs);
    }
    return res.status(404).json({ msg: 'No se encontraron ONGs' });
  } catch (error) {
    return res.status(500);
  }
};

// buscar empresa/ong por id
const searchCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },

        { model: CompanyType, as: 'type', attributes: ['type'] },
        {
          model: Address,
          as: 'address',
          include: [
            { model: City, as: 'city' },
            { model: State, as: 'state' },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CompanyTypeId'],
      },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

// buscar empresa/ong por usuario logeado
const searchCompanyByUser = async (req, res) => {
  try {
    const { userId } = req;
    // console.log('CONSOLE LOG: userId', userId);
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Company,
          as: 'company',
          include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },

            { model: CompanyType, as: 'type', attributes: ['type'] },
            {
              model: Address,
              as: 'address',
              include: [
                { model: City, as: 'city' },
                { model: State, as: 'state' },
              ],
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'CompanyTypeId'],
          },
        },
      ],
    });
    if (!user.company_id || user.company_id === null) {
      return res.json({ msg: 'El usuario no posee una compañia' });
    }
    return res.status(200).json(user.company);
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};

// actualizar imagen compañia

const uploadImageCompany = async (request, response) => {
  const { id, field } = request.params;

  const { userId: ownerId } = request;

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return response.status(400).json({
        message: 'Company not found',
      });
    }

    if (ownerId !== company.ownerId) {
      return response.status(401).json({ message: 'Not owner' });
    }

    const { tempFilePath } = request.files.file;

    switch (field) {
      case 'logo': {
        if (company.logo) {
          cloudinary.uploader.destroy(company.logo.public_id);
        }

        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({ logo: { public_id: publicId, url: secureUrl } });

        return response.status(200).json(company);
      }

      case 'banner': {
        if (company.banner) {
          cloudinary.uploader.destroy(company.banner.public_id);
        }
        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({
          banner: { public_id: publicId, url: secureUrl },
        });
        return response.status(200).json(company);
      }

      default:
        return response.status(400).json({
          message: 'El parametro field debe tener el valor  "logo" o "banner"',
        });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Fatal Error',
    });
  }
};

// eliminar/deshabilitar empresa/ong
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.userId;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({
        message: 'Company not found',
      });
    }

    if (ownerId !== company.ownerId) {
      return res.status(401).json({ message: 'Not owner' });
    }
    if (company.deleted === false) {
      await company.update({ deleted: true });
    }

    await Product.update(
      { status: 'canceled' },
      { where: { [Op.and]: [{ company_id: id }, { status: 'published' }] } }
    );
    const products = await Product.findAll({ where: { company_id: id } });
    products.forEach(async (product) => {
      await Cart.destroy({ where: { product_id: product.id } });
    });

    const users = await User.findAll({ where: { company_id: id } });
    users.forEach((user) => {
      user.setCompany(null);
    });

    return res
      .status(200)
      .json({ msg: 'Compañia deshabilitada y sus productos' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error al deshabilitar compañia' });
  }
};

// update info company //VER RUTAAAA
const updateCompany = async (req, res) => {
  const {
    name,
    description,
    areaCode,
    phone,
    email,
    website,
    street,
    number,
    zipcode,
  } = req.body;
  const { id } = req.params;
  const ownerId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({
        message: 'Company not found',
      });
    }
    if (ownerId !== company.ownerId) {
      return res.status(401).json({ message: 'Not owner' });
    }

    await company.update({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
    });

    const address = await Address.findByPk(company.id);
    if (address) {
      await address.update({
        street,
        number,
        zipcode,
      });
    }
    return res.status(200).json({ msg: 'Actualizado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error al actualizar la empresa' });
  }
};

const getUsers = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.company_id) {
      return res.status(400).json({
        message: 'El usuario no tiene compania',
      });
    }
    const users = await User.findAll({
      where: { company_id: user.company_id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'RoleId'] },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addUser = async (req, res) => {
  try {
    const { email } = req.query;
    const { userId } = req;
    const owner = await User.findByPk(userId, {
      include: { model: Company, as: 'company' },
    });

    if (!owner.company_id) {
      return res.status(400).json({
        message: 'El usuario no tiene compania',
      });
    }
    if (userId !== owner.company.ownerId) {
      return res.status(401).json({ message: 'Not owner' });
    }
    const user = await User.findOne({
      where: { email },
      include: { model: Company, as: 'company' },
    });
    if (!user || user.deleted) {
      return res.status(400).json({
        message: 'El usuario no existe.',
      });
    }
    if (!user.status) {
      return res.status(400).json({
        message: 'El usuario no existe.',
      });
    }
    if (user.company_id === owner.company_id) {
      return res.status(400).json({
        message: 'El usuario ya pertenece a tu compania.',
      });
    }
    if (user.company_id) {
      return res.status(400).json({
        message: 'El usuario ya pertenece a otra compania.',
      });
    }
    user.setCompany(owner.company_id);
    send(user.email, 'Te han agregado a una compania', `Ahora eres parte de la compania ${owner.company.name}.\n
    Si deseas dejar de ser parte, puedes desvincularte en el perfil de compania.`)
    return res.status(200).send({ message: `${user.email} added` });
  } catch (error) {
    return res.status(500).send({message: error});
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id, 10);
    const { userId } = req;
    const owner = await User.findByPk(userId, {
      include: { model: Company, as: 'company' },
    });
    console.log('id params', id, 'user id', userId);
     if (!owner.company_id) {
      return res.status(400).json({
        message: 'El usuario no tiene compania',
      });
    } 
    if (userId !== owner.company.ownerId) {
      if (userId !== id) {
        return res.status(401).json({ message: 'Not owner' });
      }
    }
    const user = await User.findOne({
      where: { id },
      include: { model: Company, as: 'company' },
    });
    if (!user || user.deleted) {
      return res.status(400).json({
        message: 'El usuario no existe',
      });
    }
    if (user.company_id !== owner.company_id) {
      return res.status(400).json({
        message: 'El usuario no pertenece a tu compania',
      });
    }
    if (user.id === owner.company.ownerId) {
      return res.status(400).json({
        message: 'El dueño no puede elimarse de la compania',
      });
    }
    user.setCompany(null);
    if (userId === id) {
      return res
        .status(200)
        .send({ message: `you exit the company '${owner.company.name}'` });
    }
    return res.status(200).send({ message: `${user.email} deleted` });
  } catch (error) {
    return res.status(500).send(error);
  }
};



module.exports = {
  getCompanies,
  createCompany,
  searchCompany,
  uploadImageCompany,
  searchCompanyByUser,
  deleteCompany,
  updateCompany,
  addUser,
  deleteUser,
  getUsers,
  getAllOngs
};
