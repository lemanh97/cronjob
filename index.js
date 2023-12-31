const axios = require('axios');
const cron = require('cron');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const url_api = "https://sv1.manhbf.site";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const urls = [
  url_api + '/cronjob/history-momo',
  url_api + '/cronjob/get-comment-momo',
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

// Tạo cron job chạy mỗi 3 giây
const job = new cron.CronJob('*/2 * * * * *', () => {
  // Gửi yêu cầu tới mỗi URL trong danh sách
  urls.forEach(async (url) => {
    await sendRequest(url);
  });
});

// Bắt đầu cron job
job.start();