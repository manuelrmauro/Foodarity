const { Op } = require('sequelize');
const City = require('../models/City');
const State = require('../models/State');

const getCities = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const cities = await City.findAll({
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'state_id'],
        },
      });
      res.status(200).json(cities);
    } else {
      const cities = await City.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      res.status(200).json(cities);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getCitiesByState = async (req, res) => {
  const { stateId } = req.params;
  const { name } = req.query;

  if (!stateId) {
    return res.status(400).json({ message: 'Missing stateId' });
  }

  if (!name) {
    try {
      const cities = await City.findAll({
        where: { state_id: stateId },
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'state_id'],
        },
      });
      return res.status(200).json(cities);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  } else {
    try {
      const cities = await City.findAll({
        where: {
          [Op.and]: [
            { name: { [Op.iLike]: `%${name}%` } },
            { state_id: stateId },
          ],
        },
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'state_id'],
        },
      });
      return res.status(200).json(cities);
    } catch (error) {
      return res.status(200).send({ message: error });
    }
  }
};

const getStates = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const states = await State.findAll({
        order: [['name', 'ASC']],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      res.status(200).json(states);
    } else {
      const states = await State.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: [['name', 'ASC']],

        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      res.status(200).json(states);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByPk(id, {
      include: [{ model: State, as: 'state' }],
    });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getStates,
  getCities,
  getCitiesByState,
  getCityById,
};
