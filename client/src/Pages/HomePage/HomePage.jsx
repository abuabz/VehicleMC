import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './HomePage.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import Select from 'react-select'

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
  const [vehicles, setVehicles] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
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

      if (response.data.success) {
        alert(response.data.message); // Alerting the user about success

        // Fetch the updated list of vehicles after adding
        const updatedResponse = await axios.get('https://vehiclerc.prosevo.com/api/documents');
        if (updatedResponse.data && updatedResponse.data.success) {
          setVehicles(updatedResponse.data.data); // Update the state with the updated data
        }

        handleClose();
      } else {
        alert('Failed to add document'); // Handle the error case
      }
    } catch (error) {
      console.error('There was an error!', error);
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
              <div className="card col-3" style={{ width: "20rem", minHeight: '256px', margin: '30px', backgroundImage: `url(${vehicle.vehicleUrl})` }} key={index} id='cardDesign'>
                <div className="card-body">
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
                    <a href="#" className="btn btn-danger" onClick={() => deleteVehicle(vehicle._id)}>
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="vehicleName">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Name"
                    autoFocus
                    value={formValues.vehicleName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="vehicleBrand">
                  <Form.Label>Vehicle Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Brand"
                    value={formValues.vehicleBrand}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
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
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 " controlId="vehicleNo">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Number"
                    value={formValues.vehicleNo}
                    onChange={handleChange}
                    required

                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="insuranceDate">
                  <Form.Label>Vehicle Insurance</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Vehicle Insurance"
                    value={formatDateToInput(formValues.insuranceDate)}
                    onChange={(e) => handleDateChange(e.target.value, 'insuranceDate')}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="PCCDate">
                  <Form.Label>Vehicle Pcc</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Vehicle PCC"
                    value={formatDateToInput(formValues.PCCDate)}
                    onChange={(e) => handleDateChange(e.target.value, 'PCCDate')}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="vehicleImg">
                  <Form.Label>Vehicle Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Vehicle Image"
                    required
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

