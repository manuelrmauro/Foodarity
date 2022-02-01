const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const CompanyType = require('../models/CompanyType');
const Company = require('../models/Company');
const User = require('../models/User');
const Role = require('../models/Role');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const PaymentMethod = require('../models/PaymentMethod');
const Donation = require('../models/Donation');
const Cart = require('../models/Cart');
const MpCredential = require('../models/MpCredential');

// Models Init

CompanyType.init(connection);
Company.init(connection);
Role.init(connection);
User.init(connection);
Address.init(connection);
City.init(connection);
State.init(connection);
Category.init(connection);
Product.init(connection);
Order.init(connection);
PaymentMethod.init(connection);
Donation.init(connection);
Cart.init(connection);
MpCredential.init(connection);

// Associate
Company.associate(connection.models);
CompanyType.associate(connection.models);
Role.associate(connection.models);
User.associate(connection.models);
Address.associate(connection.models);
City.associate(connection.models);
State.associate(connection.models);
Category.associate(connection.models);
Product.associate(connection.models);
Order.associate(connection.models);
PaymentMethod.associate(connection.models);
Donation.associate(connection.models);
Cart.associate(connection.models);
MpCredential.associate(connection.models);

module.exports = connection;
