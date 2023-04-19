import express from "express";
import { nanoid } from "nanoid";
import Url from '../models/url.js';
import validateUrl from '../validators/validateUrl.js';

import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    const base = process.env.BASE;

    const urlId = nanoid();
    if (validateUrl(origUrl)){
        try{
            let url = await Url.findOne({ origUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(400).json('Invalid Original Url');
    }
});

export { router };