import React from 'react';
import './HomePage.css';
import Navbar from '../../Components/Navbar/Navbar';


const vehicleData = [
  {
    title: "Shine 125",
    subtitle: "Honda",
    model: "2016",
    number: "KL 71 B 7909",
    insuranceDate: "22/12/2024",
    pcc: "22/06/2025 ",
    backgroundImage: 'https://media.zigcdn.com/media/model/2023/Jun/lest-side-view-1341726075_600x400.jpg'
  },
  {
    title: "CBZ",
    subtitle: "Hero",
    model: "2009",
    number: "KL 51 A 1923",
    insuranceDate: "22/01/2024",
    pcc: "22/06/2024 ",
    backgroundImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Honda_CBZ.jpg/300px-Honda_CBZ.jpg'
  },
  {
    title: "RS",
    subtitle: "Bajaj",
    model: "2019",
    number: "KL 49 L 1903",
    insuranceDate: "22/12/2024",
    pcc: "22/06/2024 ",
    backgroundImage: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/55973/rs-200-left-side-view.png'
  },
  {
    title: "Spresso",
    subtitle: "Maruthi Suzuki",
    model: "2022",
    number: "KL 6Q Q 8005",
    insuranceDate: "09/02/2024",
    pcc: "22/06/2024 ",
    backgroundImage: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/S-Presso/10348/Maruti-S-Presso-LXi/1687519307943/front-left-side-47.jpg'
  },
];
export default function HomePage() {
  const getRemainingDays = (insuranceDate) => {
    const dateParts = insuranceDate.split("/");
    const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;

    const today = new Date();
    const expiryDate = new Date(formattedDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="homeMain">
          {vehicleData.map((card, index) => {
            const remainingDays = getRemainingDays(card.insuranceDate);
            const remainingDaysOfPcc = getRemainingDays(card.pcc);
            console.log(remainingDaysOfPcc, 'pcc')
            const insuranceStyle = remainingDays < 1 ? { color: 'red' } :
              remainingDays < 15 ? { color: '#bd7a00' } : {};
            return (
              <div className="card col-3" style={{ width: "20rem", minHeight: '256px', margin: '30px', backgroundImage: `url(${card.backgroundImage})` }} key={index} id='cardDesign'>
                <div className="card-body">
                  <div className='cardContent'>
                    <h5 className="card-title fw-bold ">{card.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{card.subtitle}</h6>
                    <h6>Model : <b>{card.model}</b></h6>
                    <h6>Number : <b>{card.number}</b></h6>
                    <h6 style={insuranceStyle}>
                      Insurance: <b>{card.insuranceDate} ({remainingDays} days)</b>
                    </h6>
                    <h6>Pcc : <b>{card.pcc} ({remainingDaysOfPcc} days)</b></h6>
                  </div>

                  <div className='actions'>
                    <a href="#" className="btn btn-secondary">
                      Update
                    </a>
                    <a href="#" className="btn btn-danger">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="card col-3" style={{ width: "20rem", minHeight: '256px', margin: '30px', backgroundImage: `url(https://t4.ftcdn.net/jpg/05/53/55/21/360_F_553552160_9HxeyvvbSrOtEqpaiWsCD2TEnwQxvrwB.jpg)` }}>
                <div className="card-body d-flex  align-items-center justify-content-center "  id='cardDesignAdd'>
                  <div className='cardContent' id='addCardcontent' >
                    <h5 className="card-title fw-bold m-0 ">
                    <i class="bi bi-plus-circle-dotted"></i>
                      Add More
                      
                      </h5>
                  </div>

                  {/* <div className='actions'>
                    <a href="#" className="btn btn-secondary">
                      Update
                    </a>
                    <a href="#" className="btn btn-danger">
                      Delete
                    </a>
                  </div> */}
                </div>
              </div>
        </div>
      </div>
    </>
  );
}

