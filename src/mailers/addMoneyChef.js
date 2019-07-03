module.exports = function sendAddMoneyEmail(ctx, { user, money, total }) {
  return ctx.sendMail(
    'addMoneyEmail',
    { to: user.email, subject: 'Dinero abonado en KissTheCook' },
    { user, money, total }
  );
};
