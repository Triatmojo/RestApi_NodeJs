const express = require('express');
const router = express.Router();

const Fruit = require('../models/Fruits');

// Getting all
router.get('/', async (req, res) => {
    try {
        const fruit = await Fruit.find();
        res.json(fruit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Getting one
router.get('/:id', getFruit, (req, res) => {
    res.json(res.fruit);
    
});
// Creating one
router.post('/', async (req, res) => {
    const { name, rating, review } = req.body;
    try {
        const fruit = await Fruit.create({ name, rating, review });
        res.status(201).json(fruit);
    } catch (error) {
        res.status(400).json({ message: error.message });       
    }
});
// Update one
router.patch('/:id', getFruit, async (req, res) => {
    if (req.body.name != null) {
        res.fruit.name = req.body.name
    }
    if (req.body.rating != null) {
        res.fruit.rating = req.body.rating
    }
    if (req.body.review != null) {
        res.fruit.review = req.body.review
    }
    try {
        const updateFruit = await res.fruit.save();
        res.json(updateFruit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Deleting one
router.delete('/:id', getFruit, async (req, res) => {
    try {
        await res.fruit.remove();
        res.json({ message: 'Delete Fruit' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFruit(req, res, next) {
    let fruit
    try {
        fruit = await Fruit.findById(req.params.id);
        if (fruit == null) {
            return res.status(404).json({ message: 'Cannot find fruit' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.fruit = fruit
    next()
}

module.exports = router;