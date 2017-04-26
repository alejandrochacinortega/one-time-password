const twilio = require('twilio');

const accountSid = 'AC90328767f3aa11b39b6e0aa9935f038a';
const authToken = '7cfbf5ca7b32a4d3f88f1cb0fd14bc6c';

module.exports = new twilio.Twilio(accountSid, authToken);