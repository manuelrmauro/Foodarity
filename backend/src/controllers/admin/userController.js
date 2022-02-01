const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const User = require('../../models/User');
const Role = require('../../models/Role');
const Company = require('../../models/Company');
const City = require('../../models/City');
const State = require('../../models/State');
const Address = require('../../models/Address');
const { send } = require('../nodemailerController');

cloudinary.config(process.env.CLOUDINARY_URL);

const createUser = async (request, response) => {
  const { name, email, password, phone, role, status } = request.body;

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
      phone,
    });

    await user.setRole(role);
    await user.update({ status });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const getAllUsers = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  if (!search) {
    const users = await User.findAndCountAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'RoleId', 'role_id'],
      },
      where: { deleted: false },
      include: {
        model: Role,
        as: 'role',
        attributes: ['id', 'role'],
      },
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return response.status(200).json({
      users: users.rows,
      totalUsers: users.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(users.count / limit),
    });
  }

  const users = await User.findAndCountAll({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'RoleId', 'role_id'],
    },
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        },
        { deleted: false },
      ],
    },
    include: {
      model: Role,
      as: 'role',
      attributes: ['id', 'role'],
    },
    offset,
    limit,
    order: [['id', 'ASC']],
  });

  return response.status(200).json({
    users: users.rows,
    totalUsers: users.count,
    size: limit,
    page: offset,
    totalPages: Math.ceil(users.count / limit),
  });
};

const getUser = async (request, response) => {
  const { id } = request.params;

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
              attributes: { exclude: ['createdAt', 'updatedAt', 'lat', 'lon'] },
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
};

const deleteUser = async (request, response) => {
  console.log('delete');
  const { id } = request.params;
  const { userId } = request;

  if (id === userId) {
    return response
      .status(401)
      .json({ message: 'No te puedes elimnar a ti mismo' });
  }
  try {
    const user = await User.findByPk(id);
    await user.update({
      deleted: true,
    });
    await send(
      user.email,
      'Tu usuario fue eliminado',
      `Hola, ${user.name}. Tu cuenta fue eliminada por incumplir los reglamentos de Foodarity.`
    );
    return response.status(200).json({ message: 'Eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al eliminar' });
  }
};

const updateUser = async (request, response) => {
  const { id } = request.params;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, role, status } = request.body;

  try {
    const user = await User.findByPk(id);

    await user.update(
      {
        name,
        email,
        phone,
        status,
      },
      {
        where: { id },
      }
    );
    await user.setRole(role);

    return response.status(200).json({ message: 'Actualizado correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Error al actualizar' });
  }
};

const uploadPhotoUser = async (request, response) => {
  const { id } = request.params;
  const user = await User.findByPk(id);

  if (user.photo) {
    cloudinary.uploader.destroy(user.photo.public_id);
  }

  const { tempFilePath } = request.files.file;

  const { secure_url: secureUrl, public_id: publicId } =
    await cloudinary.uploader.upload(tempFilePath);

  await user.update({ photo: { public_id: publicId, url: secureUrl } });

  return response.status(200).json({ message: 'Actualizado correctamente' });
};

const updateUserPassword = async (request, response) => {
  const { id } = request.params;

  const { password } = request.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return response
        .status(400)
        .json({ message: 'No se encuentra el usuario' });
    }

    await user.update({
      password,
    });

    return response.status(200).json({ message: 'Actualizado correctamente' });
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
  updateUserPassword,
};
