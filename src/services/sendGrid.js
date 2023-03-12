const sgMail = require("@sendgrid/mail");
const { HttpError } = require("../utils");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (receiver, link) => {
  const msg = {
    to: receiver,
    from: "vitaliy24341@gmail.com",
    subject: "Profile verification",
    text: `Please go to ${link} to verify`,
    html: `<p>Please go to <a href="${link}">${link}</a> to verify</p>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw HttpError(500, "Cant send verification message");
  }
};

module.exports = { sendVerificationEmail };
