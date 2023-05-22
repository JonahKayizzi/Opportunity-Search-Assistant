// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const fetchData = async () => {
  try {
    const { myJobPortals } = JSON.parse(fs.readFileSync('./jobPortals.json'));
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
