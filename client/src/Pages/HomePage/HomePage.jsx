/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h3>Vehicles</h3>

      <div className="homeMain">
        <div className="card" style={{ width: "20rem", height: '400px' }} id='cardDesign'>
          <div className="card-body">
            <h5 className="card-title fw-bold ">Shine 125</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Honda</h6>
            <h6>Model : 2016</h6>
            <div className='actions'>
              <a href="#" className="btn btn-secondary ">
                Update
              </a>
              <a href="#" className="btn btn-danger">
                Delete
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
