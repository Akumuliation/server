// Налаштування конфігурації електронної пошти
export const emailConfig = {
      service: 'gmail',
      // host: "smtp.gmail.com", // Хост SMTP сервера
      // port: 587, // Порт SMTP сервера
      // secure: false,
      auth: {
            type: 'OAuth2', // Тип аутентифікації
            user: process.env.MAIL_USERNAME,   // Ім'я користувача облікового запису електронної пошти
            pass: process.env.MAIL_PASSWORD,   // Пароль облікового запису електронної пошти
            clientId: process.env.MAIL_OAUTH_CLIENTID,     // Ідентифікатор клієнта OAuth2
            clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,   // Секрет клієнта OAuth2
            refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN    // Токен оновлення OAuth2
      }
}