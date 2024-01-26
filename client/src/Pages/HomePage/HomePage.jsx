import React from 'react';
import './HomePage.css';
import Navbar from '../../Components/Navbar/Navbar';


const vehicleData = [
  {
    title: "Shine 125",
    subtitle: "Honda",
    model: "2016",
    number: "KL 71 B 7909",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://media.zigcdn.com/media/model/2023/Jun/lest-side-view-1341726075_600x400.jpg'
  },
  {
    title: "CBZ",
    subtitle: "Hero",
    model: "2009",
    number: "KL 51 A 1923",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Honda_CBZ.jpg/300px-Honda_CBZ.jpg'
  },
  {
    title: "RS",
    subtitle: "Bajaj",
    model: "2019",
    number: "KL 49 L 1903",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/55973/rs-200-left-side-view.png'
  },
  {
    title: "RS",
    subtitle: "Bajaj",
    model: "2019",
    number: "KL 49 L 1903",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/55973/rs-200-left-side-view.png'
  },
  {
    title: "RS",
    subtitle: "Bajaj",
    model: "2019",
    number: "KL 49 L 1903",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/55973/rs-200-left-side-view.png'
  },
  {
    title: "RS",
    subtitle: "Bajaj",
    model: "2019",
    number: "KL 49 L 1903",
    insurance: "22/12/2024 (331 days)",
    pcc: "22/06/2024 (148 days)",
    backgroundImage: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/55973/rs-200-left-side-view.png'
  },
];
export default function HomePage() {

  return (
    <>
      <Navbar />
      <div className="home-container">

        <div className="homeMain">
          {vehicleData.map((card, index) => (
            <div className="card col-3 " style={{ width: "20rem", minHeight: '256px', margin: '30px', backgroundImage: `url(${card.backgroundImage})`, }} key={index} id='cardDesign'>
              <div className="card-body">
                <div className='cardContent'>
                  <h5 className="card-title fw-bold ">{card.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{card.subtitle}</h6>
                  <h6>Model : <b>{card.model}</b></h6>
                  <h6>Number : <b>{card.number}</b></h6>
                  <h6>Insurance : <b>{card.insurance}</b></h6>
                  <h6>Pcc : <b>{card.pcc}</b></h6>
                </div>

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
          ))}
        </div>
      </div>
    </>

  );
}
