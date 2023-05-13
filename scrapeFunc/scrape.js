//scraping will be done here
const puppeteer = require('puppeteer');
const fs = require('fs');
const data = {
    list: []
};

async function main(skill) {
    //to open chromium and headless false means we need to see the browser getting opened and closed
    const browser =  await puppeteer.launch({ headless : false })
    const page = await browser.newPage(); //new tab
    /* picked this url from indeed website by putting skill as sde
    https://in.indeed.com/jobs?q=sde&l=Bangalore%2C+Karnataka&from=searchOnHP&vjk=20d2be84f2981248
    */
    await page.goto(`https://in.indeed.com/m/jobs?q=${skill}&l=`, {
        timeout:0,
        waitUntil:'networkidle0',
    });
    const jobData = await page.evaluate(async (data) => {
        //page.evaluate -> this helps us put a function inside this page to get the data
        const items = document.querySelectorAll('td.resultContent')
        items.forEach((item, index) => {
            //getting this from the inspect element of indeed site
            console.log(`scraping data of product: ${index}`)
            const title= item.querySelector('h2.jobTitle>a') && item.querySelector('h2.jobTitle>a').innerText
            const link =item.querySelector('h2.jobTitle>a') && item.querySelector('h2.jobTitle>a').href
            let salary= item.querySelector('div.metadata.salary-snippet-container > div') && item.querySelector('div.metadata.salary-snippet-container > div').innerText
            const companyName = item.querySelector('span.companyName') && item.querySelector('span.companyName').innerText
            if(salary===null){
                salary="not defined"
            }
            data.list.push({
                title:title,
                salary:salary,
                companyName:companyName,
                link:link
            })
        })
        return data;
    }, data)

    let response = await jobData;
    //convert from an object to string and making json file and writing data to it
    let json = JSON.stringify(jobData,null,2)
    fs.writeFile('jobs.json', json, 'utf8', () => {
        console.log('succesfully written data')
    });

    browser.close() //closing the browser
    return response;
};

module.exports = main;