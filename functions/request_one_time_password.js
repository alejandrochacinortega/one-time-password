const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number'});
  }
  
  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  console.log(' phone ', phone);
  
  admin.auth().getUser(phone)
    .then(function(userRecord) {
      const code = Math.floor((Math.random() * 8999 + 1000));
      twilio.messages.create({
        body: 'Your code is ' + code,
        to: phone,
        from: '+4759444988'
      }, function (err) {
         if (err) { return res.status(422).send(err); }
         admin.database().ref('users/' + phone)
          .update(
            {
              code: code,
              codeValid: true
            },
            function() { res.send({ success: true }); }
          )
      })
    })
  .catch(function(err) {
    res.status(422).send({ error: err});
  })
};
