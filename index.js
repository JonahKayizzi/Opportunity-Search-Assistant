const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeMailer = require('nodemailer');

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
  'rails',
  'ruby',
  'ruby on rails',
];

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'jonahkayizzi@gmail.com',
    pass: 'wgxuqcczoupjgloq',
  },
});

const mailOptions = {
  from: 'jonahkayizzi@gmail.com',
  to: 'jonahkayizzi@gmail.com',
  subject: 'Opportunity Search Assistant - Job Update',
  html: '<b>New Job Alert</b>',
};

const writeLogToFile = (logMessage) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}]: ${logMessage}\n`;
  fs.appendFileSync('log.txt', log, (err) => {
    if (err) {
      writeLogToFile('Error writing to log file');
    }
  });
};

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
      if (job.content === body) {
        writeLogToFile(`${job.name} has no new content`);
      } else {
        writeLogToFile(`${job.name} has changed`);
        if (keywords.some((keyword) => body.toLowerCase().includes(keyword))) {
          mailOptions.html = `<b>Visit their careers page ${job.url} to see the update</b>`;
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              writeLogToFile(error);
            } else {
              writeLogToFile(`Email sent: ${info.response}`);
            }
          });
        } else {
          writeLogToFile('Not interested');
        }
        job.content = body;
      }
    }
    fs.writeFileSync('./jobPortals.json', JSON.stringify({ myJobPortals }));
  } catch (error) {
    writeLogToFile(`Error: ${error}`);
  }
};

//setInterval(fetchData, 1000 * 60 * 60 * 6);
fetchData();
