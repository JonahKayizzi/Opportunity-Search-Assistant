// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');
const axios = require('axios');

const fetchData = async () => {
  try {
    const jobUrl = await axios.get('./jobPortals.json');
    const { myJobPortals } = await jobUrl.data;
    const { url } = myJobPortals[0];

    const response = await axios.get(url);
    const html = response.data;

    console.log(html);

    const $ = cheerio.load(html);

    const body = $('body').text().trim();

    console.log(body);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
