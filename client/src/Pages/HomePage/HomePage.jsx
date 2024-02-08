import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './HomePage.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import Select from 'react-select'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCar from './BIKE.png'
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--modal-color)',
    color: 'var(--text-color)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--modal-color)',
    color: 'var(--text-color)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'gray' : 'var(--modal-color)',
    color: 'var(--text-color)',
  }),
  // Add more custom styles if needed
};
export default function HomePage() {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);


  const handleClose = () =>{
setShow(false);
setFormErrors(false); 
  } 
  const handleShow = () => setShow(true);
  const getRemainingDays = (insuranceDate) => {
    const dateParts = insuranceDate.split("-");
    const formattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;

    const today = new Date();
    const expiryDate = new Date(formattedDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const [formValues, setFormValues] = useState({
    vehicleName: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleNo: '',
    insuranceDate: '',
    PCCDate: '',
    vehicleImg: null,
  });
  const handleSubmit = async (e) => {
    setSubmitCount(c => c + 1);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('vehicleName', formValues.vehicleName);
      formData.append('vehicleBrand', formValues.vehicleBrand);
      formData.append('vehicleModel', formValues.vehicleModel);
      formData.append('vehicleNo', formValues.vehicleNo);
      formData.append('insuranceDate', formValues.insuranceDate);
      formData.append('PCCDate', formValues.PCCDate);
      formData.append('vehicleImg', formValues.vehicleImg);

      const response = await axios.post('https://vehiclerc.prosevo.com/api/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.success) {
        toast.success('Vehicle is added', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        const updatedResponse = await axios.get('https://vehiclerc.prosevo.com/api/documents');
        if (updatedResponse.data && updatedResponse.data.success) {
          setVehicles(updatedResponse.data.data);
        }

        handleClose();
      } else {
        toast.error(response.data.message || 'An error occurred while adding the vehicle.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      // Updated error handling for detailed error messages


      // Inside your catch block in handleSubmit
      if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'object') {
        const errors = error.response.data.message;
        setFormErrors(errors); // Set the error messages state
      } else {
        setFormErrors({}); // Clear errors if none are returned
      }

      let errorMessage = 'There was an error processing your request.';
      if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'object') {
        const errors = error.response.data.message;
        const errorMessages = Object.keys(errors).map(key => `${errors[key]}`).join(', ');
        errorMessage = errorMessages;
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // toast.error(errorMessage, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }
  };





  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vehiclerc.prosevo.com/api/documents');
        if (response.data && response.data.success) {
          setVehicles(response.data.data); // Update the state with the fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteVehicle = async (vehicleId) => {
    try {
      const response = await axios.delete(`https://vehiclerc.prosevo.com/api/document/${vehicleId}`);
      if (response.data && response.data.success) {
        // Remove the deleted vehicle from the state
        setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));
      }
    } catch (error) {
      console.error('Error deleting the vehicle:', error);
    }
  };

  const yearOptions = Array.from({ length: (2030 - 1800) + 1 }, (_, i) => {
    const year = 1800 + i;
    return { value: year, label: year.toString() };
  });
  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);
    setFormValues({ ...formValues, vehicleModel: selectedOption.value });
  };


  const formatDateToInput = (dateString) => {
    if (!dateString) return ''; // Handle empty date string
    const parts = dateString.split('-');
    if (parts.length === 3) {
      // Assuming the input dateString is in the format "YYYY-MM-DD"
      const year = parts[0];
      const month = parts[1].padStart(2, '0'); // Ensure month is 2 digits
      const day = parts[2].padStart(2, '0');   // Ensure day is 2 digits
      return `${day}-${month}-${year}`;
    }
    return '';
  };


  // Function to parse date when changed by the user (from dd-MM-yyyy to yyyy-MM-dd)
  const handleDateChange = (inputDate, fieldName) => {
    if (!inputDate) {
      // Handle empty input by setting the respective field to an empty string
      setFormValues({ ...formValues, [fieldName]: '' });
    } else {
      const parts = inputDate.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        const isoDate = `${day}-${month}-${year}`;
        setFormValues({ ...formValues, [fieldName]: isoDate });
      } else {
        // Handle invalid input
        alert('Invalid date format. Please use yyyy-MM-dd.');
      }
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFormValues({ ...formValues, vehicleImg: file });
    }
  }






  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="home-container">

        <div className="homeMain">
          {vehicles.map((vehicle, index) => {
            const remainingInsuranceDays = getRemainingDays(vehicle.insuranceDate);
            const remainingPccDays = getRemainingDays(vehicle.PCCDate);
            const insuranceStyle = remainingInsuranceDays < 1 ? { color: 'red' } :
              remainingInsuranceDays < 15 ? { color: '#bd7a00' } : {};
            const pollutionStyle = remainingPccDays < 1 ? { color: 'red' } :
              remainingPccDays < 15 ? { color: '#bd7a00' } : {};
            return (
              <div className="card col-3" style={{ width: "304px", minHeight: '256px', margin: '30px', background: 'var(--card-color)', border: 0, borderRadius: 10 }}>
                {/* <div className="card-body p-4">
                  <div className='cardContent'>
                    <h5 className="card-title fw-bold ">{vehicle.vehicleName}</h5>
                    <h6 className="card-subtitle mb-2 brand">{vehicle.vehicleBrand}</h6>
                    <h6>Model : <b>{vehicle.vehicleModel}</b></h6>
                    <h6>Number : <b>{vehicle.vehicleNo}</b></h6>
                    <h6 style={insuranceStyle}>
                      Insurance: <b>{vehicle.insuranceDate} ({remainingInsuranceDays} days)</b>
                    </h6>
                    <h6 style={pollutionStyle}>Pcc : <b>{vehicle.PCCDate} ({remainingPccDays} days)</b></h6>
                  </div>

                  <div className='actions'>
                    <a href="#" className="btn btn-secondary">
                      Update
                    </a>
                    <a href="#" className="btn btn-danger" >
                      Delete
                    </a>
                  </div>
                </div> */}

                <div className="card-body ">
                  <div className='nameDiv'>
                    <span className="Vname">{vehicle.vehicleName}</span>
                    <div>
                      <i class="bi bi-trash-fill delete" onClick={() => deleteVehicle(vehicle._id)}></i>
                      <i class="bi bi-pen-fill edit"></i>
                    </div>
                  </div>
                  <p className="Vbrand">{vehicle.vehicleBrand}</p>
                  <div className='imageDiv'>
                    <img src={`${vehicle.vehicleUrl}`} alt="" width={"100%"} height={170} />
                    <div className="shadowDiv">
                    </div>
                  </div>
                  <table class="Pcc">
                    <tr>
                      <th><i class="bi bi-aspect-ratio"></i><span>Vehicle No</span> </th>
                      <td>:{vehicle.vehicleNo}</td>
                    </tr>
                    <tr>
                      <th><i class="bi bi-calendar2-fill"></i> <span>Vehicle Model</span></th>
                      <td>:{vehicle.vehicleModel}</td>
                    </tr>
                    <tr>
                      <th><i class="bi bi-calendar2-check"></i> <span>Insurance</span></th>
                      <td style={insuranceStyle}>:{vehicle.insuranceDate}({remainingInsuranceDays} days)</td>
                    </tr>
                    <tr>
                      <th><i class="bi bi-clouds"></i> <span>Polution</span> </th>
                      <td style={pollutionStyle}>:{vehicle.PCCDate} ({remainingPccDays} days)
                      </td>
                    </tr>
                  </table>

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


          <div className="card col-3" style={{ width: "304px", minHeight: '256px', margin: '30px', background: 'var(--card-color)', border: 0, borderRadius: 10, height: 388 }}>
            <div className="card-body p-4">
              <div className='nameDiv'>
                <span className="Vname">Shine 125</span>
                <div>
                  <i class="bi bi-trash-fill delete"></i>
                  <i class="bi bi-pen-fill edit"></i>
                </div>
              </div>
              <p className="Vbrand">Honda</p>
              <div className='imageDiv'>
                <img src={imageCar} alt="" width={"100%"} />
                <div className="shadowDiv">
                </div>
              </div>
              <table class="Pcc">
                <tr>
                  <th><i class="bi bi-aspect-ratio"></i><span>Vehicle No:</span> </th>
                  <td>KL71B7909</td>
                </tr>
                <tr>
                  <th><i class="bi bi-calendar2-fill"></i> <span>Vehicle Model:</span></th>
                  <td>2016(8 Year )</td>
                </tr>
                <tr>
                  <th><i class="bi bi-calendar2-check"></i> <span>Insurance:</span></th>
                  <td>12/12/2024(607 days)</td>
                </tr>
                <tr>
                  <th><i class="bi bi-clouds"></i> <span>Polution:</span> </th>
                  <td>12/12/2024
                    (607 days)
                  </td>
                </tr>
              </table>

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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="vehicleName">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Name"
                    autoFocus
                    value={formValues.vehicleName}
                    onChange={handleChange}
                    className={formErrors.vehicleName ? 'input-error' : ''}
                  />
                </Form.Group>
                {formErrors.vehicleName && <div className="text-danger  shake-animation" id='errorMsg'>{formErrors.vehicleName}</div>}
                <Form.Group className="mb-3 " controlId="vehicleBrand">
                  <Form.Label>Vehicle Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Brand"
                    value={formValues.vehicleBrand}
                    onChange={handleChange}
                    className={formErrors.vehicleName ? 'input-error' : ''}


                  />
                </Form.Group>
                {formErrors.vehicleBrand && <div className="text-danger  shake-animation" id='errorMsg'>{formErrors.vehicleBrand}</div>}

                <Form.Group className="mb-3" controlId="vehicleModel">
                  <Form.Label>Vehicle Model</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Vehicle Model"
                    value={formValues.vehicleModel}
                    onChange={handleChange}

                  /> */}
                  <Select
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={yearOptions}
                    placeholder="Select a model year..."
                    isSearchable={true}
                    styles={customStyles}
                    className={formErrors.vehicleName ? 'input-error' : ''}


                  />
                </Form.Group>
                {formErrors.vehicleModel && <div className="text-danger shake-animation" id='errorMsg'>{formErrors.vehicleModel}</div>}


                <Form.Group className="mb-3 " controlId="vehicleNo">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Number"
                    value={formValues.vehicleNo}
                    onChange={handleChange}
                    className={formErrors.vehicleName ? 'input-error' : ''}



                  />
                </Form.Group>
                {formErrors.vehicleNo && <div className="text-danger shake-animation" id='errorMsg'>{formErrors.vehicleNo}</div>}

                <Form.Group className="mb-3" controlId="insuranceDate">
                  <Form.Label>Vehicle Insurance</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Vehicle Insurance"
                    value={formatDateToInput(formValues.insuranceDate)}
                    onChange={(e) => handleDateChange(e.target.value, 'insuranceDate')}
                    className={formErrors.vehicleName ? 'input-error' : ''}


                  />
                </Form.Group>
                {formErrors.insuranceDate && <div className="text-danger shake-animation" id='errorMsg'>{formErrors.insuranceDate}</div>}

                <Form.Group className="mb-3 " controlId="PCCDate">
                  <Form.Label>Vehicle Pcc</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Vehicle PCC"
                    value={formatDateToInput(formValues.PCCDate)}
                    onChange={(e) => handleDateChange(e.target.value, 'PCCDate')}
                    className={formErrors.vehicleName ? 'input-error' : ''}


                  />
                </Form.Group>
                {formErrors.PCCDate && <div className="text-danger shake-animation" id='errorMsg'>{formErrors.PCCDate}</div>}


                <Form.Group className="mb-3" controlId="vehicleImg">
                  <Form.Label>Vehicle Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Vehicle Image"

                    onChange={(e) => handleFileChange(e)} // Add this line
                  />
                </Form.Group>


                <Modal.Footer>
                  <Button variant="secondary" type='submit'>Add</Button>
                  <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>

          </Modal>

        </div>
      </div>
    </>
  );
}

