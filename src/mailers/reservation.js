module.exports = function sendReservationEmail(ctx, { user, dish }) {
  return ctx.sendMail(
    'reservationEmail',
    { to: user.email, subject: 'Reservacion de plato en KissTheCook' },
    { user, dish }
  );
};
