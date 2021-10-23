const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", 'tag_name'],
    include: [{
      model: Product,
      attributes: ["product_name", "id", "price", "stock", "category_id"]
    }]
  }).then((data) => {
    res.json(data)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    attributes: ["id", 'tag_name'],
    include: [{
      model: Product,
      attributes: ["product_name", "id", "price", "stock", "category_id"]
    }]
  }).then((data) => {
    res.json(data)
  })
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    let tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData)
  } catch(error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let tag = await Tag.update(
      {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    }
    );
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }).then((tagDelete) => {
    res.json(tagDelete)
  }).catch((error) => res.json(error))
});

module.exports = router;
