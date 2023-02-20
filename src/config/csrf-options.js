module.exports = {
  options: {
    getSecret: (req) => req.secret,
    secret: process.env.CSRF_SECRET,
    cookieName: process.env.CSRF_COOKIE_NAME,
    cookieOptions: { sameSite: 'strict', secure: true },
    size: 128,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => (req.body.csrfToken
      ? req.body.csrfToken
      : req.headers[process.env.CSRF_COOKIE_NAME]),
  },
};
