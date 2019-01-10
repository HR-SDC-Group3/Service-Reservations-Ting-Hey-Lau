# CRUD API PATHS

#app.get(/api/reservations/restaurantID=:restaurantID&date=:date)
 	this api path queries the database for reservations with the restaurantID and date in the request params.

#app.post(/api/reservations)
  this api path posts new reservations to the database with parameters in the request body (namely restaurantID, date, time and partySize).

#app.put(/api/reservations)
  this api path updates existing reservations in the database with parameters in the request body (namely reservationID, date, time and partySize) by first identifying the reservation to update using reservationID, then updating the entry with the new date, time and partySize.

  this api path is not currently utilised on the client side.

#app.delete(/api/reservations)
  this api path deletes existing reservations in the database with the reservationID specified in the request body.

  this api path is not currently utilised on the client side.