import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function Edit(props) {
  console.log(props);
  return (
    <DefaultLayout>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Edit Airline Entry</h1>
        <form action={`/flights/${props.log._id}?_method=PUT`} method="POST">
          <label htmlFor="ttl">Airline</label> <br />
          <input type="text" id="ttl" name="title" value={props.log.airline} />
          <br />
          <br />
          <label htmlFor="ety">Flight Number</label>
          <br />
          <input type="text" id="ety" name="entry" value={props.log.flightNo} />
          <br />
          <br />
          <div className="d-flex"></div>
          <br />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <label htmlFor="airport">Destination:</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="airport"
            >
              <option selected>Select Destination</option>
              <option value="AUS">AUS</option>
              <option value="DAL">DAL</option>
              <option value="LAX">LAX</option>
              <option value="SAN">SAN</option>
              <option value="SEA">SEA</option>
            </select>

            <br />

            <div className="d-flex">
              <button className="btn btn-outline-success">Submit</button>
              <a href="/flights">
                <button className="btn btn-outline-dark mx-3">Back</button>
              </a>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default Edit;
