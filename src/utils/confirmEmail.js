import nodemailer from "nodemailer";
const { google } = require("googleapis");

export const confirmEmail = async (email, subject, html) => {
  try {
    //CREATE OAUTH2 CLIENT
    const MyOAuth2Client = new google.auth.OAuth2(
      `118433726660-13eqb0qngcgcftnkj8d31so0hj181fe3.apps.googleusercontent.com`,
      `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`,
      `https://developers.google.com/oauthplayground`
    );
    MyOAuth2Client.setCredentials({
      refresh_token: `1//04fCJIRjMW2n5CgYIARAAGAQSNwF-L9IrJsIQaf3w3rxHhMMa3J-pM9SJosTfKdbNNc3VSwkIuCRjBpPEzzXkUQOgyseJzaUcsB0`,
    });

    //GENERATE ACCESS_TOKEN
    const accessToken = await MyOAuth2Client.getAccessToken();

    //SEND MAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: `conian2505@gmail.com`,
        clientId: `118433726660-13eqb0qngcgcftnkj8d31so0hj181fe3.apps.googleusercontent.com`,
        clientSecret: `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`,
        refreshToken: `1//04fCJIRjMW2n5CgYIARAAGAQSNwF-L9IrJsIQaf3w3rxHhMMa3J-pM9SJosTfKdbNNc3VSwkIuCRjBpPEzzXkUQOgyseJzaUcsB0`,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: "conian2505@gmai",
      to: email,
      subject: subject,
      html: html,
    });

    if (info.accepted) {
      console.log(info);
      return info;
    } else {
      throw new Error("Couldn't send email");
    }
  } catch (error) {
    return error;
  }
};
