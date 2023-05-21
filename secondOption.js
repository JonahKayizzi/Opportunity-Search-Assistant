const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://chat.openai.com/c/0842bf16-36a4-4e9f-bfba-418788336160';

const fetchData = async () => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    console.log(html);

    const $ = cheerio.load(html);

    const body = $('body').text().trim();

    console.log(body);
  } catch (error) {
    console.error('Error', error.message);
  }
};

fetchData();
