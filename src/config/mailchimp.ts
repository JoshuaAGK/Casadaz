import * as dotenv from "dotenv";
const mailchimp = require("@mailchimp/mailchimp_marketing");

dotenv.config();

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_AUTH,
    server: process.env.MAILCHIMP_SERVER,
});

export default mailchimp;