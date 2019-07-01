module.exports = function sendReservationEmailClient(ctx, { user, dish }) {
  return ctx.sendMail(
    'reservationEmailClient',
    { to: user.email, subject: 'Reservacion de plato en KissTheCook' },
    { user, dish }
  );
};
