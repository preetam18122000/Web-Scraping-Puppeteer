const express = require('express');
const routes = express.Router();
const main = require('../scrapeFunc/scrape');
routes.post('/indeed', async(req, res) => {
    //whenever you use async, always use try catch
    try {
        const { skill } = req.body;
        let scrpe = await main(skill);
        return res.status(200).json({
            status: "ok",
            list: scrpe?.list || {}
        })
    } catch (e) {
        return res.status(500).send(e);
    }
})

module.exports = routes;