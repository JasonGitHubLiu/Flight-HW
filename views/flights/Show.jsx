import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function Show(props) {
  console.log(props.flight);
  const usedAirports = props.flight.destinations.map(
    (destination) => destination.airport
  );

  const availableAirports = ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'].filter(
    (airport) => !usedAirports.includes(airport)
  );

  let today = new Date(); // Get today's date and time

  let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours() - 4,
    today.getMinutes(),
    today.getSeconds()
  );
  currentDate = currentDate.toISOString().slice(0, 16);
  console.log(currentDate);

  return (
    <DefaultLayout>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Show View</h1>
        <p>
          <strong>Airline: </strong> {props.flight.airline}
        </p>
        <p>
          <strong>Flight No: </strong>
          {props.flight.flightNo}
        </p>
        {/* <p>
          {' '}
          <strong>Ship Status: </strong>{' '}
          {props.flight.shipIsBroken ? 'Broken' : 'Working'}
        </p> */}
        <p>
          <strong>Departs: </strong>
          {props.flight.departs.toString().slice(0, 25)}
        </p>

        <br />

        <table
          class="table table-primary table-striped text-center "
          style={{ width: '60vw' }}
        >
          <thead>
            <tr>
              <th scope="col">Airport</th>
              <th scope="col">Arrival</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {props.flight.destinations.map((destination) => (
              <>
                <tr>
                  <th scope="row">{destination.airport}</th>
                  <td>{destination?.arrival?.toString()}</td>
                  <td>
                    <form
                      action={`/flights/${props.flight._id}/destinations/${destination._id}?_method=DELETE`}
                      method="POST"
                    >
                      <button className="btn btn-outline-danger mx-5">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <details>
          <summary style={{ opacity: '.6' }}>Destinations:</summary>
          <form
            action={`/flights/${props.flight._id}/destinations`}
            method="POST"
          >
            <div class="input-group mb-3 ">
              <div>
                <select
                  class="form-select text-center"
                  multiple
                  aria-label="multiple select example"
                  name="airport"
                  style={{
                    height: '150px',
                    width: '200px',
                    overflow: 'hidden',
                  }}
                >
                  {/* <option selected>Select a Destination</option> */}

                  {/* <option value="AUS">AUS</option>
                <option value="DAL">DAL</option>
                <option value="LAX">LAX</option>
                <option value="SAN">SAN</option>
                <option value="SEA">SEA</option> */}
                  {availableAirports.map((airport) => (
                    <option value={airport}>{airport}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class='d-flex flex-column'>
              
            <label for="arrival">Choose a date/time for your flight:</label>
            <input
              type="datetime-local"
              id="arrival"
              name="arrival"
              value={currentDate}
              // min="2018-06-07T00:00"
              // max="2018-06-14T00:00"
            ></input>
<br />
<button class="btn btn-outline-dark">Add Destination</button>
            </div>
          </form>
          <br /> <br />
        </details>

        <div className="d-flex mx-2">
          <a href={`/flights/${props.flight._id}/edit`}>
            <button class="btn btn-outline-primary">Edit</button>
          </a>

          <br />
          <br />

          <form
            action={`/flights/${props.flight._id}?_method=DELETE`}
            method="POST"
          >
            <button className="btn btn-outline-danger mx-3">Delete</button>
          </form>

          <br />

          <a href="/flights">
            <button className="btn btn-outline-success">Back</button>
          </a>
          {/* render all the destinations then add an input ........ map and populate.... after adding a destination */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Show;

// import React from "react";
// import DefaultLayout from "../layout/DefaultLayout";

// function Show(props) {
//   console.log(props)
//   console.log(props.flight.destinations);
//   let today = new Date(); // Get today's date and time

//   let currentDate = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate(),
//     today.getHours() - 4,
//     today.getMinutes(),
//     today.getSeconds()
//   );
//   currentDate = currentDate.toISOString().slice(0, 16);
//   console.log(currentDate);

//   console.error("Error: Today's date is undefined");
//   const usedAirports = props.flight.destinations.map(
//     (x) => x.airport
//   );
//   const availableAirports = ["AUS", "DAL", "LAX", "SAN", "SEA"].filter(
//     (x) => !usedAirports.includes(x)
//   );

//   return (
//     <DefaultLayout>
//       <div className="d-flex align-items-center justify-content-center flex-column">
//         <h1>Airline: {props.flight.airline}</h1>
//         <h3>Flight Number: {props.flight.flightNo}</h3>
//         <h3>Departs: {props.flight?.departs?.toString()}</h3>
//         {/* <h3>Destination: {props.flight.destinations[0].name}</h3> */}
//         <br />
//         <br />

//         {/* <ul>
//           {props.flight.destinations.map((destination) => (
//             <>
//               <div className="d-flex">
//                 <form
//                   action={`/flights/${props.flight._id}/destinations/${destination._id}?_method=DELETE`}
//                   method="POST"
//                 >
//                   <input type="submit" value="X" />
//                 </form>

//                 <li key={destination._id} style={{ listStyle: "none" }}>
//                   <p>Airport: {destination.airport}</p>
//                   <p>Arrival: {destination?.arrival?.toString()}</p>
//                 </li>
//               </div>
//             </>
//           ))}
//         </ul> */}
//         <div style={{ width: "60vw" }}>
//           <table class="table text-center table-dark table-striped">
//             <thead>
//               <tr>
//                 <th scope="col">Airport</th>
//                 <th scope="col">Arrival</th>
//                 {/* <th scope="col">Edit</th> */}
//                 <th scope="col">Delete</th>
//               </tr>
//             </thead>
//             <tbody class="table-group-divider">
//               {props.flight.destinations.map((destination) => (
//                 <>
//                   <tr>
//                     <th scope="row">{destination.airport}</th>
//                     <td>{destination?.arrival?.toString()}</td>
//                     {/* <td><form
//                         action={`/flights/${props.flight._id}/destinations/${destination._id}?_method=UPDATE`}
//                         method="PUT"
//                       >
//                         <button className="btn btn-outline-warning mx-5">
//                           Edit
//                         </button>
//                       </form></td> */}
//                     <td>
//                       <form
//                         action={`/flights/${props.flight._id}/destinations/${destination._id}?_method=DELETE`}
//                         method="POST"
//                       >
//                         <button className="btn btn-outline-danger mx-5">
//                           Delete
//                         </button>
//                       </form>
//                     </td>
//                   </tr>
//                 </>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <br />
//         <br />
//         {/* details */}
//         <details>
//           <summary style={{ opacity: ".5" }}>Destinations:</summary>
//           <form
//             action={`/flights/${props.flight._id}/destinations`}
//             method="POST"
//           >
//             {/* <h4>Aiport: {}</h4>
//             <h4>Arrival:</h4> */}
//             <div class="input-group mb-3">
//               <div class="form-floating text-center d-flex justify-content-center">
//                 <select
//                   class="form-select"
//                   style={{ width: "30vw" }}
//                   name="airport"
//                   aria-label="Default select example"
//                 >
//                   <option selected>Select a Destination</option>
//                   {/* <option value="AUS">AUS</option>
//                   <option value="DAL">DAL</option>
//                   <option value="LAX">LAX</option>
//                   <option value="SAN" selected>
//                     SAN
//                   </option>
//                   <option value="SEA">SEA</option> */}
//                   {availableAirports.map((airport) => (
//                     <option value={airport}>{airport}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div class="">
//               <div class="text-center d-flex align-items-center justify-content-center flex-column">
//                 <label for="arrival">Choose a date/time for your flight:</label>
//                 <input
//                   type="datetime-local"
//                   id="arrival"
//                   name="arrival"
//                   value={currentDate}
//                   // min="2018-06-07T00:00"
//                   // max="2018-06-14T00:00"
//                 ></input>

//                 <br />
//             <button className="btn btn-outline-success">Add Destination</button>
//               </div>
//             </div>
//           </form>
//         </details>
//         {/* details */}
//         <br />
//         <div className="d-flex">
//           {/* <a href={`/flights/${props.flight._id}/edit`}>
//             <button className="btn btn-outline-primary">Edit</button>
//           </a> */}
//           <form action={`/flights/${props.flight._id}/edit`}>
//             <button className="btn btn-outline-primary">Edit</button>
//           </form>
//           {/* <form
//             action={`/flights/${props.flight._id}?_method=DELETE`}
//             method="POST"
//           >
//             <button className="btn btn-outline-danger mx-5">Delete</button>
//           </form> */}
//           <form
//             action={`/flights/${props.flight._id}?_method=DELETE`}
//             method="POST"
//           >
//             <button className="btn btn-outline-danger mx-5">Delete</button>
//           </form>
//           {/* <a href="/flights">
//             <button className="btn btn-outline-dark">Back</button>
//           </a> */}
//           <form action="/flights">
//             <button className="btn btn-outline-dark">Back</button>
//           </form>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }

// export default Show;
