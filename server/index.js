import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalle.routes.js';
import Stripe from 'stripe';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY );
const YOUR_DOMAIN = 'http://localhost:5173';
app.post('/create-checkout-session', async (req, res) => {
   try{
        const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1NPOYdBK6fvdQPvJWZQBm1T5',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}`,
        cancel_url: `${YOUR_DOMAIN}`,
    })
  
    res.redirect(303, session.url);
   }catch(e){
    res.json(e);
   }
  });

app.use('/api/v1/dalle',dalleRoutes);
app.get('/',(req,res)=>{
    res.json({message : "what's up bitch"});
})

app.listen(8080,()=>console.log('conected'));