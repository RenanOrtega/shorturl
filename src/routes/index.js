import express from "express";
import UrlRepository from '../repositories/url_repository.js';
import Url from '../models/url.js';

const router = express.Router();

router.get('/:urlId', async (req, res) => {
    try {
        // const url = await UrlRepository.findByUrlId(req.params.urlId);

        const url = await Url.findOne({ urlId: req.params.urlId });

        if (url) {
            // await UrlRepository.update(req.params.urlId);
            await Url.updateOne(
                {
                    urlId: req.params.urlId,
                },
                { $inc: { clicks: 1 }}
            );
            return res.redirect(url.originalUrl);
        } else {
            res
            .status(404)
            .json(`Not found this Url: ${url}. Try another.`);
        }
    } catch (err) {
        console.log(err);
        res
        .status(500)
        .json('Server Error');
    }
});

router.get('/showInfos/:urlId', async (req, res) => {
    try {
        // const url = await UrlRepository.findByUrlId(req.params.urlId);

        const url = await Url.findOne({ urlId: req.params.urlId });

        if (url) {
            // await UrlRepository.update(req.params.urlId);
            return res.json(url);
        } else {
            res
            .status(404)
            .json(`Not found this Url: ${url}. Try another.`);
        }
    } catch (err) {
        console.log(err);
        res
        .status(500)
        .json('Server Error');
    }
});

export default router;