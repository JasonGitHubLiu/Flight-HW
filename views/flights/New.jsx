import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

function New() {
  let today = new Date(); // Get today's date and time
  let futureDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate() + 2,
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );
  let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );

  return (
    <DefaultLayout>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>New View</h1>
        <h1>Log Entry</h1>
        <form action="/flights" method="POST">
          <label htmlFor="al">Airline:</label>
          <br />
          <select
            class="form-select"
            aria-label="Default select example"
            name="airline"
          >
            <option selected>Select Airline</option>
            <option value="American">American</option>
            <option value="Southwest">Southwest</option>
            <option value="United">United</option>
          </select>
          <br />


          <label htmlFor="flt">Flight No:</label>
          <br />
          <textarea style={{ width: '30vw' }} id="flt" name="flightNo" />
          <br />

          <label htmlFor="flt">Departs:</label>
          <input
            type="text"
            class="form-control text-center"
            id="ts"
            name="departs"
            placeholder="Username"
            value={futureDate}
            style={{ width: '30vw' }}
          />
          <br />
          <label htmlFor="airport">Airport:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            name="airport"
          >
            <option selected>Select Airport</option>
            <option value="AUS">AUS</option>
            <option value="DAL">DAL</option>
            <option value="LAX">LAX</option>
            <option value="SAN">SAN</option>
            <option value="SEA">SEA</option>
          </select>

          <br />
          <br />

          <button>Submit</button>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default New;
