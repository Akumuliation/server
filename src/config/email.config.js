export const emailConfig = {
      service: 'gmail',
      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false,
      auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.MAIL_OAUTH_CLIENTID,
            clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN
      }
}