const axios = require('axios');
const cron = require('cron');

// Các URL cần gửi yêu cầu
const urls = [
  'http://127.0.0.1:8000/cronjob/get-comment-momo',
  'http://127.0.0.1:8000/cronjob/history-momo',
  'https://benat.bet'
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
