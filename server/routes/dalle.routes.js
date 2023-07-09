import express, { json } from 'express';
import dotenv from 'dotenv';
import { OpenAIApi ,Configuration} from 'openai';

dotenv.config();
const router = express.Router();
const configuration = new Configuration({
    apiKey : process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.json({message:"heloo from routes bitches"});
})
router.route('/').post(async (req,res)=>{
    try{
        const {prompt} = req.body;
        const response = await openai.createImage({prompt,n:1,size:'512x512',response_format:'b64_json'});
        const image = response.data.data[0].b64_json;
        res.json({photo:image});
    }catch(e){
        console.log("there is an error");
        res.json({message : 'there is a problem'});
    }
})

export default router ;