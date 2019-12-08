const {Inventory, validateInventory} = require('../models/inventory');
const {Item, validateItem} = require('../models/item');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);
    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

router.put('/:id/gold', async (req, res) => {
    const { error } = validateInventory(req.body.gold);
    if(error) return res.status(400).send(error.details[0].message);

    const inventory = await Inventory.findByIdAndUpdate(req.params.id,
        {
            gold: req.body.gold
        }, { new: true });
    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

router.put('/:id/backpack', async (req, res) => {
    const { error } = validateInventory(req.body.backpack);
    if(error) return res.status(400).send(error.details[0].message);

    const item = await Item.findById(req.body.id);
    if(!item) return res.status(400).send('Invalid item.');

    const inventory = await Inventory.findByIdAndUpdate(req.params.id,
        {
            backpack: {
                _id: item._id
            }
        }, { new: true });

    if(!inventory) return res.status(404).send('The inventory with the given ID was not found.');
    res.send(inventory);
});

module.exports = router;