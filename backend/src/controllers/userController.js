const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/User');
const Role = require('../models/Role');
const Company = require('../models/Company');
const City = require('../models/City');
const State = require('../models/State');
const Address = require('../models/Address');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

cloudinary.config(process.env.CLOUDINARY_URL);

const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({
      where: { [Op.and]: [{ email }, { deleted: false }] },
    });

    if (user) {
      if (user.email === email)
        return response
          .status(400)
          .json({ message: 'Este email ya esta en uso' });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    await user.setRole(1);

    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      name: user.name,
      roleId: user.role_id,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      socialPhoto: user.socialPhoto,
      token,
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'RoleId', 'role_id'],
      },
      include: {
        model: Role,
        as: 'role',
        attributes: ['id', 'role'],
      },
    });

    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const getUser = async (request, response) => {
  const { id } = request.params;

  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: [
          'password',
          'createdAt',
          'updatedAt',
          'RoleId',
          'role_id',
          'CompanyId',
          'companyId',
        ],
      },
      where: { deleted: false },
      include: [
        { model: Role, as: 'role', attributes: ['id', 'role'] },
        {
          model: Company,
          as: 'company',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: {
            model: Address,
            as: 'address',
            attributes: {
              exclude: [
                'CompanyId',
                'createdAt',
                'updatedAt',
                'addressId',
                'CityId',
                'StateId',
              ],
            },
            include: [
              {
                model: City,
                as: 'city',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'state_id', 'lat', 'lon'],
                },
              },
              {
                model: State,
                as: 'state',
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'lat', 'lon'],
                },
              },
            ],
          },
        },
      ],
    });

    if (!user) {
      return response.status(400).json({ message: 'Usuario no encontrador' });
    }

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const deleteUser = async (request, response) => {
  let id = null;

  if (request.userRoleId === 2) {
    id = request.params.id;
    if (!id)
      return response.status(400).json({ message: 'El id es requerido' });
  } else {
    id = request.userId;
  }

  try {
    const user = await User.findByPk(id);
    if (user.company_id) {
      const company = await Company.findByPk(user.company_id);
      if (Number(company.ownerId) === Number(id)) {
        let products = await Product.findAll({where : {company_id : user.company_id}})
        await User.update(
          {
            company_id: null,
          },
          { where: { company_id: user.company_id } }
        );
        await company.update({ deleted: true });
        await user.update({
          deleted: true,
          company_id: null,
        });
        products = products.map(product => product.id)
        await Product.update(
          { status: 'canceled' },
          { where: { id : products } }
        );
        await Cart.destroy(
          {
            where : {product_id : products}
          }
        );
      } else {
        await user.update({
          deleted: true,
          company_id: null,
        });
      }
    } else {
      await user.update({
        deleted: true,
      });
    }

    return response.status(200).json({ message: 'Eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al eliminar' });
  }
};

const updateUser = async (request, response) => {
  let id = null;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  if (request.userRoleId === 2) {
    id = request.params.id;
    if (!id)
      return response.status(400).json({ message: 'El id es requerido' });
  } else {
    id = request.userId;
  }

  const { name, email, phone } = request.body;

  try {
    await User.update(
      {
        name,
        email,
        phone,
      },
      {
        where: { id },
      }
    );

    return response.status(200).json({ message: 'Actualizado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al actualizar' });
  }
};

const uploadPhotoUser = async (request, response) => {
  const user = await User.findByPk(request.userId);

  if (user.photo) {
    cloudinary.uploader.destroy(user.photo.public_id);
  }

  const { tempFilePath } = request.files.file;

  const { secure_url: secureUrl, public_id: publicId } =
    await cloudinary.uploader.upload(tempFilePath);

  await user.update({ photo: { public_id: publicId, url: secureUrl } });

  return response.status(200).json(user);
};

const validate = async (req, res) => {
  try {
    const { id, usercode } = req.params;
    const user = await User.findOne({
      where: { [Op.and]: [{ id }, { mailCode: usercode }] },
    });
    if (!user.validated) {
      await user.update({ validated: true });
      await user.update({ mailCode: null });
    } else {
      return res.status(201).json({ message: 'ya esta validado' });
    }
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updatePassword = async (request, response) => {
  const { input, emailCode } = request.body;
  const { password, passwordDos } = input;
  console.log(input, emailCode);

  try {
    const user = await User.findOne({ where: { mailCode: emailCode } });

    if (!user) {
      return response.status(400).json({ message: 'Verifique los datos' });
    }

    if (password !== passwordDos) {
      return response.status(400).json({ message: 'Verifique los datos' });
    }

    user.update({ password: passwordDos, mailCode: null });
    return response.status(200).json({ message: 'Datos Actulizados' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
  validate,
  updatePassword,
};
