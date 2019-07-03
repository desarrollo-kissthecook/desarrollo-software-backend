module.exports = function sendSubstractMoneyEmail(ctx, { user, money, total }) {
  return ctx.sendMail(
    'substractMoneyEmail',
    { to: user.email, subject: 'Dinero retirado en KissTheCook' },
    { user, money, total }
  );
};
