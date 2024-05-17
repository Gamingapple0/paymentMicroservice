const stripe = require('stripe')(process.env.STRIPE_KEY)

const validatePayment = async (req, res) => {
    try {
      const { productName, amount, url } = req.body;
      console.log(req.body);
      const line_items = [
        {
          price_data: {
            product_data: {
              name: productName
            },
            currency: 'aud',
            unit_amount: Math.round(amount * 100), // Assuming `amount` is specified in the smallest currency unit (e.g., cents)
          },
          quantity: 1
        }
      ]
      console.log(line_items);
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items:line_items,
          mode: 'payment',
          success_url: url + '/success',
          cancel_url: url + '/cancel',
      });
      res.json({id:session.id, message: 'Payment session created', url: session.url })
  }
  catch(e){
    console.log(e);
  }
}
  
  module.exports = { validatePayment };