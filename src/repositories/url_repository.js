import Url from '../models/url.js';

class UrlRepository
{
    async findByOriginalUrl(originalUrl){
        return await Url.findOne({ originalUrl });
    }
    
    async findByUrlId(urlId){
        return await Url.findOne({ urlId })
    }
    
    async update(urlId){
        await Url.updateOne(
            {
                urlId: urlId,
            },
            { $inc: { clicks: 1 }}
        );
    }
    
    async insert(Url){
        await Url.save();
    }
}

export default UrlRepository