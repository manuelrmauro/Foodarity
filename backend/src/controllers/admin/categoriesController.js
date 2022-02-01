const { Op } = require('sequelize');
const Category = require('../../models/Category');

const getAllCategories = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  if (!search) {
    const categories = await Category.findAndCountAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { deleted: false },
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return response.status(200).json({
      categories: categories.rows,
      totalCategories: categories.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(categories.count / limit),
    });
  }

  const categories = await Category.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {
      [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }, { deleted: false }],
    },
    offset,
    limit,
    order: [['id', 'ASC']],
  });

  return response.status(200).json({
    categories: categories.rows,
    totalCategories: categories.count,
    size: limit,
    page: offset,
    totalPages: Math.ceil(categories.count / limit),
  });
};

const showCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'name'],
    });
    if (!allCategories) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCategory = async (request, response) => {
  const { id } = request.params;

  const category = await Category.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: { deleted: false },
    
  });

  if (!category) {
    return response.status(400).json({ message: 'Categoria no encontrada' });
  }

  return response.status(200).json(category);
};

const updateCategory = async (request, response) => {
  const { id } = request.params;
  const {name} = request.body

  try {
    const category = await Category.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { deleted: false },
      
    });
  
    if (!category) {
      return response.status(400).json({ message: 'Categoria no encontrada' });
    }
  
    await category.update({name})
  
    return response.status(200).json(category);
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Server error' });
  }

};

const deleteCategory = async (request, response) => {
  const { id } = request.params;
  

  try {
    const category = await Category.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { deleted: false },
      
    });
  
    if (!category) {
      return response.status(400).json({ message: 'Categoria no encontrada' });
    }
  
    await category.update({deleted:true})
  
    return response.status(200).json(category);
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Server error' });
  }

};

const createCategory = async (request, response) => {
  const {name} = request.body

  try {
  
    const category = Category.create({name})
  
    return response.status(200).json(category);
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Server error' });
  }

};

module.exports = {
  getAllCategories,
  showCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory
};
