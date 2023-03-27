import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
// import DefaultLayout from '../layouts/DefaultLayout';

function Index(props) {
  console.log(props);

  const date = new Date();

  return (
    // <DefaultLayout title="Index View">
    <DefaultLayout>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Index View</h1>
        <div className="d-flex">
          <a href="/flights/new" className="mx-3">
            <button type="button" class="btn btn-outline-primary">
              Add
            </button>
          </a>

          <br />
          <br />

          <form action="/flights/clear?_method=DELETE" method="POST">
            <button className="btn btn-outline-danger">CLEAR</button>
          </form>
        </div>
        <ul>
          {props.flights.map((flights, index) => (
            <div className="my-3">
              {' '}
              <div class="card" style={{ width: '25rem' }}>
                <div class="card-body text-center">  <strong><h3>Airline:</h3></strong>
                  <a href={`/flights/${flights._id}`}>
                    <h5 class="card-title"> {flights.airport}</h5>
                  </a>
                  <p>
                    <br /> 
                     <strong><h4>Departure:</h4></strong>
                    {flights.departs < date && <h5 class="card-title" style={{color: 'red'}}><strong>Date:</strong> {`${flights.departs.toISOString().slice(0, 10)}`}</h5>}                    
                    {flights.departs > date && <h5 class="card-title"><strong>Date:</strong> {`${flights.departs.toISOString().slice(0, 10)}`}</h5>}                    
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
        <div className="d-flex">
          <a href="/flights/new" className="mx-3">
            <button type="button" class="btn btn-outline-primary">
              Add
            </button>
          </a>

          <br />
          <br />
          <br />

          <form action="/flights/clear?_method=DELETE" method="POST">
            <button className="btn btn-outline-danger">CLEAR</button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Index;
