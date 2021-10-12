const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['category_name', 'id'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'category_id', 'stock']
    }]
  }).then((category) => {
    res.json(category)
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    attributes: ['category_name', 'id'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'category_id', 'stock']
    }]
  }).then((categories) => {
    res.json(categories)
  })
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    let categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200), JSON(categoryData)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let categoryUpdate = await Category.update({
      category_name: req.body.category_name
    },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200), JSON(categoryUpdate)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then((categoryDelete) => {
    res.json(categoryDelete);
  }).catch((error) => res.json(error))
});

module.exports = router;
