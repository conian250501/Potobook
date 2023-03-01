import nodemailer from "nodemailer";
const { google } = require("googleapis");
import dotenv from "dotenv";
dotenv.config();

export const confirmEmail = async (email, subject, html) => {
  try {
    //CREATE OAUTH2 CLIENT
    const MyOAuth2Client = new google.auth.OAuth2(
      `${process.env.GOOGLE_CLIENT_ID}`,
      `${process.env.GOOGLE_CLIENT_SECRET}`,
      `https://developers.google.com/oauthplayground`
    );
    MyOAuth2Client.setCredentials({
      refresh_token: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
    });

    //GENERATE ACCESS_TOKEN
    const accessToken = await MyOAuth2Client.getAccessToken();

    //SEND MAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: `${process.env.GOOGLE_USER}`,
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        refreshToken: `${process.env.GOOGLE_CLIENT_REFRESH_TOKEN}`,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `${process.env.GOOGLE_USER}`,
      to: email,
      subject: subject,
      html: html,
    });

    if (info.accepted) {
      return info;
    } else {
      throw new Error("Couldn't send email");
    }
  } catch (error) {
    return error;
  }
};
