require('newrelic');

const React = require('react');
const ReactDom = require('react-dom/server');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/postGres.js');
const cors = require('cors');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');
//import AppPage = require('../client/dist/bundle.js');

console.log(App);

const app = express();

app.use(`/restaurants/:id/`, express.static(`${__dirname}/../client/dist`));
app.use(express.static(`${__dirname}/../client/dist/`));
app.use(express.static(`${__dirname}/../public/`));
app.use(bodyParser());
app.use(cors());

app.get('/', (req, res) => {
  res.redirect(`http://${document.URL.split('/')[2]}/api/reservations/restaurantID=${10}&date=012219`);
})

app.get('/restaurants/:id/4Head', (req, res) => {
  res.end(Layout('Reserve.me Calendar', App(['reservationApp']), Scripts(['reservationApp'])));
})

app.post('/api/restaurants/', (req, res) => {
  db.addRestaurant(req.body.restaurantID, req.body.name.toString()).then(results => {
    res.end();
  })
  .catch(() => {
    res.status(500).end();
  })
});

app.get('/api/reservations/restaurantID=:restaurantID&date=:date', (req, res) => {
  db.getReservations(req.params.restaurantID, req.params.date.toString()).then(results => {
    res.end(JSON.stringify(results));
  })
  .catch(() => {
    res.status(500).end();
  })
});

app.get('/api/testerino/', (req, res) => {
  let restaurantID = Math.floor(Math.pow(Math.random(), -10)*10000000);
  let date = "012219";
  db.getReservations(restaurantID, date).then(results => {
    res.end(JSON.stringify(results));
  })
  .catch(() => {
    res.status(500).end();
  })
});

app.post('/api/reservations/', (req, res) => {
  db.addReservation(req.body.restaurantID, req.body.date.toString(), req.body.time.toString(), req.body.partySize.toString()).then(() => {
    res.status(201).end();
  })
  .catch(() => {
    res.status(500).end();
  })

});

app.delete(`/api/reservations/`, (req, res) => {
	db.deleteReservation(req.body.reservationID).then(() => {
    res.end();
  })
  .catch(() => {
    res.status(500).end();
  })

});
//no such function on client side that deletes entries
app.put(`/api/reservations/`, (req, res) => {
	db.updateReservations(req.body.reservationID, req.body.date.toString(), req.body.time.toString(), req.body.partySize.toString()).then(() => {
    res.end();
  })
  .catch(() => {
    res.status(500).end();
  })
});

const port = 3002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
