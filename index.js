const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const keywords = [
  'javascript',
  'node',
  'react',
  'frontend',
  'backend',
  'fullstack',
  'full stack',
  'full-stack',
  'redux',
  'Rails',
  'Ruby',
  'Ruby on Rails',
];
const fetchData = async () => {
  try {
    const { myJobPortals } = JSON.parse(fs.readFileSync('./jobPortals.json'));
    // eslint-disable-next-line no-restricted-syntax
    for (const job of myJobPortals) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(job.url);
      const html = response.data;
      const $ = cheerio.load(html);
      const body = $('body').text().trim();
      // eslint-disable-next-line no-unused-expressions
      job.content === body
        ? console.log(`${job.name} has no new content`)
        : (() => {
            console.log(`${job.name} has changed`);
            job.content = body;
          })();
    }
    fs.writeFileSync('./jobPortals.json', JSON.stringify({ myJobPortals }));
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
