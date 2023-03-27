const mongoose = require('mongoose');

//Schema lets you create blueprints for the structure?
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    // expecting the "name" property to be a string. validation to make sure the data is legit
    airport: { type: String, required: true, enum: ['AUS', 'DAL','LAX', 'SAN','SEA']}, 
    arrival: { type: Date},
  },
);

// Instantiate a new schema object for fruit and structour our data
const flightSchema = new Schema(
  {
    // expecting the "name" property to be a string. validation to make sure the data is legit
    airline: { type: String, required: true, enum: ['American', 'Southwest','United']}, 
    flightNo: { type: Number, required: 10 <= 9999 },
    // departs: { type: Date, required: true },
    departs: { type: Date, default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000), required: true,},
    airport: { type: String, required: true, enum: ['AUS', 'DAL','LAX', 'SAN','SEA']}, 
    destinations: [destinationSchema],
  },
  { timestamps: true }
  );


// Creating our model using our fruitSchema and give our collection a name of "fruits"
const Flights = mongoose.model('flights', flightSchema);

const Destinations = mongoose.model('destinations', destinationSchema);

// exporting the Destination model as a module
module.exports = {Flights, Destinations}
