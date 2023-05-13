const express = require('express');
const routes = express.Router();
const main = require('../scrapeFunc/scrape');
const path = require('path');

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

//router to getData
routes.get('/getData',async(req,res)=>{
    try {
      const jobs =path.join(__dirname,'..','jobs.json')
      res.sendFile(jobs);
    } catch (error) {
      return res.status(500).send(error);
    }
})

module.exports = routes;