module.exports = function sendReservationEmailChef(
  ctx,
  { user, userChef, dish }
) {
  return ctx.sendMail(
    'reservationEmailChef',
    { to: userChef.email, subject: 'Reservacion de plato en KissTheCook' },
    { user, userChef, dish }
  );
};
