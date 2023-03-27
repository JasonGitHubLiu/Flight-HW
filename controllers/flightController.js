// Load the log model
const {Flights, Destinations} = require('../models/FlightModel');
// const Destination = require('../models/FlightModel');

// The callback functions originally the second argument from -> app.get('/', () => {})
module.exports.index = async (req, res) => {
  try {
    // Use the log model to interact with the database
    // find will get all documents from the log collection
    const flights = await Flights.find().sort({departs:1});
    console.log(flights);

    // Looks in the views folder for "flights/Index" and passes { flights } data to the view (kind of like a server props object)
    res.render('flights/Index', { flights }); // throws flights variable to the index view
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// Those anonymous callback functions now have names: "index" and "show"
module.exports.show = async (req, res) => {
  try {
    // const flight = await Flights.findById(req.params.id);
    const flight = await Flights.findById(req.params.id).populate('destinations');
    console.log('flight1', flight)
    
    res.render('flights/Show', { flight });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// GET /flights/new
module.exports.new = (req, res) => {
    const newFlight = new Flights();
  res.render('flights/New');
};

// Flight /flights
module.exports.create = async (req, res) => {
  console.log('Flight /flights')
  try {
    // use the model to interact with db and create a new document in the log collection
    const result = await Flights.create(req.body);
    const destinations = Destinations.create(req.body)
    console.log(result);
    await Flights.findByIdAndUpdate(req.params.id, {
      $push: {
        destinations: destinations._id,
      }
    })

  } catch (err) {
    console.log(err);
  }

  res.redirect('/flights');
};

// DELETE /flights/:name
module.exports.delete = async (req, res) => {
  console.log('DELETE /flights/:id');
  await Flights.findByIdAndDelete(req.params.id);
  res.redirect('/flights');
};

// GET /flights/:name/edit
module.exports.edit = async (req, res) => {
  console.log('GET /flights/:id/edit');
  try {
    const log = await Flights.findById(req.params.id);
    res.render('flights/Edit', { log });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// PUT /flights/:id
module.exports.update = async (req, res) => {
  console.log('PUT /flights/:id');
  console.log(req.body);

  try {
    // pass the id to find the document in the db and the form data (req.body) to update it
    await Flights.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.seed = async (req, res) => {
  console.log('Flight /flights/seed');
  try {
    await Flights.deleteMany({}); // Keep empty to delete everything
    await Flights.create(flights);
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.clear = async (req, res) => {
  console.log('DELETE /flights/clear');
  try {
    await Flights.deleteMany({});
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// EXTRA LOGIC (for Destinations)

module.exports.createDestination = async (req, res) => {
  // create a Destination by updating the Destinations property in Flight
  await Flights.findByIdAndUpdate(req.params.id, {
      // push the req.body to the Destinations property/field of this Flight document
      $push: {
          destinations: req.body
      }
  })
  res.redirect(`/Flights/${req.params.id}`)
}

module.exports.deleteDestination = async (req, res) => {
  // delete a Destination by updating the Destinations property in Flight
  await Flights.findByIdAndUpdate(req.params.id, {
      // pulling out or removing a subdocument  
      $pull: {
          // from the Destinations property/field
          destinations: {
              // with a matching Destination id
              _id: req.params.cid
          }
      }
  })
  res.redirect(`/Flights/${req.params.id}`)
}

module.exports.indexDestination = async (req, res) => {
  // target the Destinations property 
  const Flight = await Flights.findById(req.params.id)
  res.send(Flight.Destinations)
}

module.exports.showDestination = async (req, res) => {
  // find the Flight and filter it's Destinations property array
  const Flight = await Flights.findById(req.params.id)
  const [ Destination ] = Flight.destinations.filter(Destination => Destination._id.toString() === req.params.cid) 
  res.render('Destinations/Edit', { FlightId: req.params.id, Destination })
}

module.exports.updateDestination = async (req, res) => {
  // update a Destination by updating an item in the Destinations property in Flight

  // OPTION 1: using only Mongo operators and queries (more confusing)
console.log(req.body) 
  // find the Flight with the matching id, then check that Flight's Destinations for matching Destination id
  await Flights.updateOne({ _id: req.params.id, 'Destinations._id': req.params.cid }, {
      // set/replace the content 
      $set: {
          // of the Destination at index (represented by $) and change its body property   -->    Destinations[1].body = 'value
          'Destinations.$.body': req.body.body // req.body is the form data and req.body.body is the updated value of the Destination
      }
  })

  // OPTION 2: using plain JavaScript together with Mongo queries (less efficient)

  // const Flight = await Flights.findById(req.params.id)
  // const index = Flight.Destinations.findIndex(Destination => Destination._id.toString() === req.params.cid)
  // Flight.Destinations[index].body = req.body.body
  // await Flight.save()

  res.redirect(`/Flights/${req.params.id}`)
}