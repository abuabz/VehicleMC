import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './HomePage.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios'

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
  const [show, setShow] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getRemainingDays = (insuranceDate) => {
    const dateParts = insuranceDate.split("-");
    const formattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;

    const today = new Date();
    const expiryDate = new Date(formattedDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://super-eel-bell-bottoms.cyclic.app/api/documents');
        if (response.data && response.data.success) {
          setVehicles(response.data.data); // Update the state with the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="homeMain">
          {vehicles.map((vehicle, index) => {
            const remainingInsuranceDays = getRemainingDays(vehicle.insuranceDate);
            const remainingPccDays = getRemainingDays(vehicle.PCCDate);
            const insuranceStyle = remainingInsuranceDays < 1 ? { color: 'red' } :
              remainingInsuranceDays < 15 ? { color: '#bd7a00' } : {};
            return (
              <div className="card col-3" style={{ width: "20rem", minHeight: '256px', margin: '30px', backgroundImage: `url(https://t4.ftcdn.net/jpg/05/53/55/21/360_F_553552160_9HxeyvvbSrOtEqpaiWsCD2TEnwQxvrwB.jpg)` }} key={index} id='cardDesign'>
                <div className="card-body">
                  <div className='cardContent'>
                    <h5 className="card-title fw-bold ">{vehicle.vehicleName}</h5>
                    <h6 className="card-subtitle mb-2 brand">{vehicle.vehicleBrand}</h6>
                    <h6>Model : <b>{vehicle.vehicleModel}</b></h6>
                    <h6>Number : <b>{vehicle.vehicleNo}</b></h6>
                    <h6 style={insuranceStyle}>
                      Insurance: <b>{vehicle.insuranceDate} ({remainingInsuranceDays} days)</b>
                    </h6>
                    <h6>Pcc : <b>{vehicle.PCCDate} ({remainingPccDays} days)</b></h6>
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
            <div className="card-body d-flex  align-items-center justify-content-center " id='cardDesignAdd'>
              <div className='cardContent' id='addCardcontent' onClick={handleShow}>
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

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title>Add Vehicle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
                  <Form.Label>Vehicle Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Brand"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Vehicle Model</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option disabled>Choose...</option>
                    {Array.from({ length: (2030 - 1800) + 1 }, (_, i) => 1800 + i).map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary">Add</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

