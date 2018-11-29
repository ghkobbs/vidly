const { Customer, Validate } = require('../models/customers');
const express = require('express');
const router = express.Router(); 

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
});

router.post('/', async (req, res) => {
    try {
        let customer = Validate(req.body);
        if(!customer){ return res.status(400).send(error.details[0].message) }

        customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        await customer.save();
        res.send(customer);
    } 
    catch (ex) {
        res.send(ex.message);
    }

});

router.put('/:id', async (req, res) => {
    try{
        let customer = Validate(req.body);

        if(!customer){ return res.status(404).send('No Customer was found with the ID that was supplied.')}

        customer = await Customer.findOneAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }, { new: true });
        if(!customer){ return res.status(404).send('No Customer was found with the ID that was supplied.')}
        res.send(customer); 
    }
    catch(ex){
        res.send(ex.message);
    }   
});

router.get('/:id', async (req, res) => {

    customer = await Customer.findById(req.params.id);    
    if(!customer){ return res.status(404).send('No Customer was found with the ID that was supplied.')}

    res.send(customer);
    
});

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer){ return res.status(404).send('No Customer was found with the ID that was supplied.')}
    res.send(customer);   

});

module.exports = router;