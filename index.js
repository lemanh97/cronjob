const axios = require('axios');
const cron = require('cron');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const url_website = "http://127.0.0.1:8000";
const url_api = "https://sv1.manhbf.site";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// Các URL cần gửi yêu cầu
const chuyentien = [
  url_website + '/api/cron-chuyentien/bank'
];

const urls = [
  url_website + '/api/vip/cronjod/momo',
  url_website + '/api/vip/cronjod/bank',

  url_website + '/api/cron-chuyentien/momo',

  url_website + '/api/cronjob/lo-de/momo',
  url_website + '/api/cronjob/lo-de/bank',

  url_website + '/api/cronjob/lode/ket-qua/loto',
  url_website + '/api/cronjob/lode/ket-qua/de',
  url_website + '/api/cronjob/lode/ket-qua/de3cang',

  url_website + '/api/cronjob/lode/thanh-toan/momo',
  url_website + '/api/cronjob/lode/thanh-toan/bank',

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
const job = new cron.CronJob('*/3 * * * * *', () => {
  // Gửi yêu cầu tới mỗi URL trong danh sách
  urls.forEach(async (url) => {
    await sendRequest(url);
  });
});

// Tạo cron job chuyển tiền chạy mỗi 10 giây
const job2 = new cron.CronJob('*/10 * * * * *', () => {
  // Gửi yêu cầu tới mỗi URL trong danh sách
  chuyentien.forEach(async (url) => {
    await sendRequest(url);
  });
});


// Bắt đầu cron job
job.start();
job2.start();