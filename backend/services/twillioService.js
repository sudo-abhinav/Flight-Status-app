require("dotenv").config();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);



const sendMessage = async (body , to) => {
  let msgOption = {
    body,
    from: "+13302398343",
    to: `+91${to}`, 
  };
  try {
    const msg = await client.messages.create(msgOption);
    console.log(msg);
  } catch (err) { 
    console.error(err);
  }
};

module.exports =  sendMessage;
