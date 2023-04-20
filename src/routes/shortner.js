import express from "express";
import { nanoid } from "nanoid";
import Url from '../models/url.js';
import validateUrl from '../validators/validateUrl.js';
import UrlRepository from '../repositories/url_repository.js';

import * as dotenv from 'dotenv'
dotenv.config()
 
const router = express.Router();

router.post('/short', async (req, res) => {
    const { originalUrl } = req.body;
    const base = process.env.BASE;

    const urlId = nanoid();

    if (validateUrl(originalUrl)){
        try{
            // let url = await UrlRepository.findOne({ originalUrl });
            let url = await Url.findOne({ originalUrl });
            
            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${base}/${urlId}`;
                // await UrlRepository.insert(new Url({ originalUrl, shortUrl, urlId, date: new Date()}));
                url = new Url({ originalUrl, shortUrl, urlId, date: new Date()});
                url.save();
                res.json(url);
            }

        } catch (err) {
            console.log(err);
            res
            .status(500)
            .json('Server Error');
        }
    } else {
        res
        .status(400)
        .json('Invalid Original Url');
    }
});

export default router;