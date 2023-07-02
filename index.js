const axios = require('axios');
const cron = require('cron');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
// Các URL cần gửi yêu cầu
const urls = [
  'https://manhbf.site/cronjob/get-comment-momo',
  'https://manhbf.site/cronjob/history-momo',
  'https://sv1.manhbf.site/api/cron-nap-momo',
  'https://sv1.manhbf.site/api/auto-withdraw-momo',
];

// Hàm thực hiện yêu cầu HTTP
const sendRequest = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(`Response from ${url}:`, response.data);
  } catch (error) {
    console.error(`Error while requesting ${url}:`, error.message);
  }
};

// Tạo cron job chạy mỗi giây
const job = new cron.CronJob('*/5 * * * * *', () => {
  // Gửi yêu cầu tới mỗi URL trong danh sách
  urls.forEach(async (url) => {
    await sendRequest(url);
  });
});

// Bắt đầu cron job
job.start();
