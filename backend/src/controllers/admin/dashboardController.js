// const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Order = require('../../models/Order');


const dasboardMetrics = async (request, response) => {
  try {
    const totalUsers = await User.count({ where: { deleted: false } });
    const usersByRegisterMethod = await User.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'cant'],
        'register_method',
      ],
      // attributes: ['id', Sequelize.fn('count', Sequelize.col('id'))],
      group: ['register_method'],
      where: { deleted: false },
    });
    const totalCompanies = await Company.count();
    const companiesByType = await Company.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'cant'],
        'company_type_id',
      ],
      group: ['company_type_id'],
      where: { deleted: false },
    });
    const totalOrders = await Order.count();
    const ordersBypaymenthod = await Order.findAll({
      attributes: [
        [Sequelize.fn('count', Sequelize.col('id')), 'cant'],
        'payment_method_id',
      ],

      group: ['payment_method_id'],
    });

    return response.status(200).json({
      totalUsers,
      totalCompanies,
      totalOrders,
      usersByRegisterMethod,
      companiesByType,
      ordersBypaymenthod,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

module.exports = {
  dasboardMetrics,
};
