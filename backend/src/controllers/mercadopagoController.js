/* eslint-disable camelcase */
const axios = require('axios');
const mercadopago = require('mercadopago');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');
const Company = require('../models/Company');
const MpCredential = require('../models/MpCredential');
const {send} = require('./nodemailerController')

const APP_ID = process.env.MP_CLIENT_ID;
const SECRET_ID = process.env.MP_CLIENT_SECRET_ID;
const REDIRECT_PAGE = process.env.MP_REDIRECT;
const MARKETPLACE_FEE = process.env.MP_MARKETPLACE_FEE;
const FRONT_BASE_URL = process.env.FRONT_URL;

const getUrlRegister = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.company_id) {
      return res
        .status(401)
        .json({ message: 'El usuaria no posee un comercio' });
    }
    if (user.company.company_type_id !== 1) {
      return res.status(401).json({
        message: 'Solo las companias tipo comercio pueden publicar productos',
      });
    }
    if (user.company.status !== 'Habilitada') {
      return res.status(401).json({
        message: 'Solo los comercios habilitados pueden publicar productos',
      });
    }

    const company = await Company.findOne({ where: { id: user.company_id } });
    await company.update({ mpCode: uuidv4() });
    return res
      .status(200)
      .send(
        `https://auth.mercadopago.com.ar/authorization?client_id=${APP_ID}&response_type=code&platform_id=mp&state=${company.mpCode}&redirect_uri=${REDIRECT_PAGE}`
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const validateCode = async (request, response) => {
  const { code, state } = request.query;
  const { userId } = request;

  if (!code && !state) {
    return response.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const data = `client_secret=${SECRET_ID}&client_id=${APP_ID}&grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_PAGE}`;

    const company = await Company.findOne({ where: { ownerId: userId } });
    if (company.mp_credential_id) {
      send (company.email, 'Ya podes comprar con Mercado Pago', 'La vinculación de tu compania con Mercado Pago fue exitosa.')
      return response
        .status(400)
        .send({ message: 'Compania con credenciales activa' });
    }

    const config = {
      method: 'post',
      url: 'https://api.mercadopago.com/oauth/token',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    const resultado = await axios(config);

    const {
      access_token: accessToken,
      expires_in: expireIn,
      user_id: mpUserId,
      refresh_token: refreshToken,
      public_key: publicKey,
    } = resultado.data;

    console.log(resultado.data); // TODO: Eliminar despues de Probar

    const credential = await MpCredential.create({
      accessToken,
      expireIn,
      mpUserId,
      refreshToken,
      publicKey,
    });

    await company.setMpcredential(credential);

    return response.status(200).json({ message: 'Credenciales Registradas' });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error });
  }
};

const createPreference = async (request, response) => {
  const { userId } = request;
  const { items, company_id: commerceId, external_reference } = request.body;

  console.log(commerceId, userId);
  if (!commerceId) {
    return response.status(400).json({ messaje: 'falta el comerceId' });
  }

  try {
    const userPayer = await User.findByPk(userId, {
      attributes: {
        exclude: [
          'password',
          'createdAt',
          'updatedAt',
          'RoleId',
          'role_id',
          'phone',
          'photo',
          'socialPhoto',
          'registerMethod',
          'status',
          'deleted',
          'company_id',
        ],
      },
    });
    const commerce = await Company.findByPk(commerceId, {
      include: [
        {
          model: MpCredential,
          as: 'mpcredential',
          attributes: ['accessToken', 'mpUserId', 'publicKey'],
        },
      ],
      attributes: {
        exclude: [
          'phone',
          'logo',
          'banner',
          'status',
          'deleted',
          'ownerId',
          'createdAt',
          'updatedAt',
          'company_type_id',
          'address_id',
          'mp_credential_id',
        ],
      },
    });

    try {
      const preference = {
        items,
        payer: {
          name: userPayer.name,
        },
        back_urls: {
          success: `${FRONT_BASE_URL}/mpsuccess`,
          pending: `${FRONT_BASE_URL}/mppending`,
          failure: `${FRONT_BASE_URL}/mpfail`,
        },
        marketplace_fee: Number(MARKETPLACE_FEE),
        external_reference,
        binary_mode: true,
        auto_return: "approved",
      };
      mercadopago.configure({
        access_token: commerce.mpcredential.accessToken,
      });

      const { body: preferenceCreated } = await mercadopago.preferences.create(
        preference
      );
      return response.status(201).json({ preferenceCreated });
    } catch (error) {
      return response.status(500).json({
        message: 'Error al generar la preferencia por mercado pago',
        error,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ messaje: 'Internal server error' });
  }
};

const unlinkMercadopago = async (req, res) => {
  const {userId} = req
  try {
    const user = await User.findByPk(userId)
  if (!user) {
    return res.status(400).json({message: 'el usuario no existe'})
  }
  if (!user.status) {
    return res.status(400).json({message: 'el usuario no esta habilitadop'})
  } 
  if (user.deleted) {
    return res.status(400).json({message: 'el usuario no existe'})
  }
  if (!user.validated) {
    return res.status(400).json({message: 'el usuario no esta validado'})
  }
  const company = await Company.findByPk(user.company_id)
  if (!company) {
    return res.status(400).json({message: 'la compania no existe'})
  }
  company.update({mpCode: null, mp_credential_id: null})
  company.setMpcredential(null)
  return res.status(200).json(company)
  } catch (error) {
    return res.status(500).json({message: error})
  }
  
}

module.exports = {
  validateCode,
  getUrlRegister,
  createPreference,
  unlinkMercadopago
};
