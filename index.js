// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const fetchData = async () => {
  try {
    const { myJobPortals } = JSON.parse(fs.readFileSync('./jobPortals.json'));
    const urls = myJobPortals.map((job) => job.url);

    for (const url of urls) {
      const response = await axios.get(url);
      const html = response.data;

      console.log(body);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
