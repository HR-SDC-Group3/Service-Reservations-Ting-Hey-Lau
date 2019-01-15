require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/postgres.js');
const cors = require('cors');

const app = express();

app.use(`/restaurants/:id/`, express.static(`${__dirname}/../client/dist`));
app.use(bodyParser());
app.use(cors());

app.get('/api/reservations/restaurantID=:restaurantID&date=:date', (req, res) => {
  db.getReservations(req.params.restaurantID, req.params.date).then((results) => {
    console.log('results', results);
    res.end(JSON.stringify(results));
  });
});

app.post('/api/reservations/', (req, res) => {
	console.log(req);
  db.addReservation(req.body.restaurantID, req.body.date.toString(), req.body.time.toString(), req.body.partySize.toString()).then(() => {
    res.end();
  });
});

app.delete(`/api/reservations/restaurantID=:restaurantID&date=:date`, (req, res) => {
	db.deleteReservation(req.body.reservationID).then(() => {
    res.end();
  })
});
//no such function on client side that deletes entries
app.put(`/api/reservations/restaurantID=:restaurantID&date=:date`, (req, res) => {
	db.updateReservations(req.body.reservationID, req.body.date, req.body.time, req.body.partySize).then(() => {
    res.end();
  })
});

const port = 3002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
