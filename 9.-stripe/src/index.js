const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();

const stripe = new Stripe("sk_test_51Hei49LoD7pxih2R1WfDBM9nXO1A1iclhFMMoiAZTsRTkymkL1SPw56YhwQtx4XeDOiH6PVbdC1Dw9sqEIBaUC8P00cWBFdIxe");

app.use(cors({ origin: 'http://localhost:3000'}))
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
    const { id, amount } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Laptop Apple",
            payment_method: id,
            confirm: true
        });
    
        res.json({ msg: 'Succesfull payment' })
        
    } catch (error) {
        console.log(error);
        // res.json({ message: error });
        res.json({ message: error.raw.message });
    }

});

app.listen(9000, () => {
    console.log('Server on port', 9000);
});