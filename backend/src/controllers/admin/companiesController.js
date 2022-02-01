const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;
const Company = require('../../models/Company');
const CompanyType = require('../../models/CompanyType');
const Address = require('../../models/Address');
const City = require('../../models/City');
const State = require('../../models/State');
const { send } = require('../nodemailerController');

cloudinary.config(process.env.CLOUDINARY_URL);

// obtner info de todas las compañias
const getCompanies = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search, status } = request.query;

  const { limit, offset } = getPagination(page, size);

  if (!search) {
    try {
      const companies = await Company.findAndCountAll({
        where: {
          status: status || [
            'Habilitada',
            'Deshabilitada',
            'Pendiente',
            'Banneada',
          ],
          deleted: false,
        },
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
        offset,
        limit,
        order: [['id', 'ASC']],
      });

      if (companies.rows.length > 0) {
        return response.status(200).json({
          companies: companies.rows,
          totalCompanies: companies.count,
          size: limit,
          page: offset,
          totalPages: Math.ceil(companies.count / limit),
        });
      }
      return response.status(200).json({
        companies: companies.rows,
        totalCompanies: companies.count,
        size: limit,
        page: offset,
        totalPages: Math.ceil(companies.count / limit),
      });
    } catch (error) {
      return response.status(500);
    }
  }

  try {
    const companies = await Company.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } },
            ],
          },
          {
            status: status || [
              'Habilitada',
              'Deshabilitada',
              'Pendiente',
              'Banneada',
            ], 
            deleted:false,
          },
        ],
      },
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
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    if (companies.rows.length > 0) {
      return response.status(200).json({
        companies: companies.rows,
        totalCompanies: companies.count,
        size: limit,
        page: offset,
        totalPages: Math.ceil(companies.count / limit),
      });
    }
    return response.status(200).json([]);
  } catch (error) {
    return response.status(500);
  }
};

const getCompanyById = async (request, response) => {
  try {
    const { id } = request.params;
    const company = await Company.findByPk(id, {
      include: [
        { model: CompanyType, as: 'type', attributes: ['id', 'type'] },
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
      response.status(200).json(company);
    } else {
      response.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    response.status(500).send({ msg: error });
  }
};

const deleteCompany = async (request, response) => {
  try {
    const { id } = request.params;
    const company = await Company.findByPk(id);
    if (company) {
      // TODO: Verificar demas temas de la compania para elimnar
      await company.update({ deleted: true });
      await send(
        company.email,
        'Tu compania fue eliminada',
        `Tu compania ${company.name} fue eliminada por incumplir los reglamentos de Foodarity.`
      );
      response.status(200).json({ message: 'Compania Eliminada' });
    } else {
      response.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    response.status(500).send({ msg: error });
  }
};

const updateCompany = async (request, response) => {
  try {
    const { id } = request.params;
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
      status,
    } = request.body;

    const company = await Company.findByPk(id);
    if (company) {
      // TODO: Actualizo los datos, verificar mas validaciones

      await company.update({
        name,
        description,
        areaCode,
        phone,
        email,
        website,
        status,
      });

      // const updatedType = await CompanyType.findByPk(type)
      // console.log(type);
      // console.log(updatedType);
      await company.setType(type);

      const address = await Address.findByPk(company.id);
      if (address) {
        await address.update({
          street,
          number,
          zipcode,
        });
      }

      await address.setState(stateId);
      await address.setCity(cityId);
      await company.setAddress(address);
      switch (status) {
        case 'Habilitada':
          await send(
            company.email,
            'Tu compania fue habilitada!',
            `Tu compania ${company.name} fue aprobada para funcionar en Foodarity. Felicitaciones!`
          );
          break;
        case 'Deshabilitada':
          await send(
            company.email,
            'Tu compania no fue aprobada',
            `Tu compania ${company.name} no aprobó los requisitos para funcionar en Foodarity. Por favor revisa tus datos ingresados. Para consultas envia un mail a help@foodarity.com`
          );
          break;
        case 'Banneada':
          await send(
            company.email,
            'Tu compania fue eliminada',
            `Tu compania ${company.name} fue eliminada por incumplir los reglamentos de Foodarity.`
          );
          break;
        default:
          return;
      }
      response.status(200).json({ message: 'Compania Actualizada' });
    } else {
      response.status(404).json({ msg: 'Not found company' });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ msg: error });
  }
};

const uploadImageCompany = async (request, response) => {
  const { id, field } = request.params;

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return response.status(400).json({
        message: 'Company not found',
      });
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

module.exports = {
  getCompanies,
  getCompanyById,
  deleteCompany,
  updateCompany,
  uploadImageCompany,
};
