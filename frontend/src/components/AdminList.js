import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import * as XLSX from 'xlsx';
import Navbar from './Admin1_Header'


// import { generateAdminListPDF } from './pdfGenerator'; // Import the function to generate the PDF

const AdminHeader = () => {
    const [AttendanceData, setAttendanceData] = useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const initialState = {
        name: '',
        registrationNumber: '',
        email:'',
        adminType:'',
        position:'',
        course:'',
        branch: '',
        year: ''
        // const {name, registrationNumber, email,  adminType, course, branch, year} = req.body;
    };

    const [formData,setFormData] = useState(initialState);



    useEffect(() => {
      fetchData();
    }, []);
  
 

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/Admin');
          const responseData = await response.json();
          setAttendanceData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    if (AttendanceData === null) {
        return <div>Loading...</div>;
    }

    
    const handleEntriesToShowChange = (event) => {
        setEntriesToShow(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    const entriesPerPage = entriesToShow;
    const dataLength = AttendanceData ? AttendanceData.length : 0;
    const totalPages = Math.ceil(dataLength / entriesToShow);
    const indexOfLastEntry = currentPage * entriesToShow;
    const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
    const displayedEntries = AttendanceData.slice(indexOfFirstEntry, indexOfLastEntry);

  
    const pageLinks = [];
    for (let page = 1; page <= totalPages; page++) {
        pageLinks.push(
            <li
                className={`page-item ${currentPage === page ? "active" : ""}`}
                aria-current="page"
                key={page}
            >
                <a className="page-link" href="#" onClick={() => setCurrentPage(page)}>
                    {page}
                </a>
            </li>
        );
    }


    const handleModalToggle = () => {
        setShowModal(!showModal);
    };


    const handleInputChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevFormData) =>{
            return {
                ...prevFormData,
                [name]:value,
            };
        });
    };
       





    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:5000/api/add-Admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
      
          console.log('Response from backend:', data);
      
          handleModalToggle();
          setFormData(initialState);
          fetchData();
        } catch (error) {
          console.log('Error sending data to backend:', error);
        }
      }
      







    const handleReportClick = () => {
        // Call the function to generate the admin list PDF
        // generateAdminListPDF();
          // Create a new workbook
          const workbook = XLSX.utils.book_new();
        
            
          // Convert student data to worksheet format
          const worksheet = XLSX.utils.json_to_sheet(AttendanceData);
      
          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');
      
          // Generate the Excel file
          // Generate a unique timestamp
          const timestamp = Date.now();
          XLSX.writeFile(workbook, `admin_report_${timestamp}.xlsx`);
    };

    return (

        <>
        {/* <Navbar/> */}
        <div className="d-flex align-items-start justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-sm-6 d-flex align-items-center">
                        <div className="dataTables_length bs-select" id="dtBasicExample_length">
                            <div className="d-flex align-items-center">
                                <h2 className="mr-auto">Admin List</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <div className="d-flex ml-auto">
                            <Button variant="secondary" onClick={handleReportClick} style={{ marginRight: '10px' }}>Report</Button>
                            <Button variant="primary" onClick={handleModalToggle}>Add</Button>
                        </div>
                    </div>










                    {/* Modal code goes here */}
                    <Modal show={showModal} onHide={handleModalToggle}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Admin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        {/* const {name, registrationNumber, email,  adminType, course, branch, year} = req.body; */}

                            {/* Modal content goes here */}
                            <form onSubmit={handleSubmit}>
                                {/* Form fields */}
                                <div className="form-group">
                                    <label htmlFor="name">Admin Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationNumber">Registration Number</label>
                                    <input type="text" className="form-control" id="registrationNumber" name="registrationNumber" value ={formData.registrationNumber} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value ={formData.email} onChange={handleInputChange} />
                                </div>


                                <div className="form-group mb-2 mt-2">
                                    <label >AdminType</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="Admin1" name="adminType" value="Admin1" onChange={handleInputChange}/>
                                                <label className="form-check-label" htmlFor="Admin1">Admin1</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="Admin2" name="adminType" value="Admin2" onChange={handleInputChange} />
                                                <label className="form-check-label" htmlFor="Admin2">Admin2</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="position">Position</label>
                                    <select className="form-control" id="position" onChange={handleInputChange} name="position" value={formData.position} >
                                        <option value="">Select Position</option>
                                        <option value="president">President</option>
                                        <option value="vice-president">Vice President</option>
                                        <option value="em-head">EM Head</option>
                                        <option value="creative-head">Creative Head</option>
                                        <option value="content-head">Content Head</option>
                                        <option value="pr-head">PR Head</option>
                                        <option value="strategic-planning-head">strategic & Planning Head</option>
                                        <option value="media-head">Media Head</option>
                                        <option value="web-head">Web Head</option>
                                        <option value="pg-representative">PG Representative</option>
                                        <option value="general-secratary">General Secratary</option>
                                        <option value="joint-secratary">Join Secratory</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="course">Course</label>
                                    <select className="form-control" id="course" name="course" value={formData.course} onChange={handleInputChange}>
                                        <option value="">Select Course</option>
                                        <option value="B-tech">B-Tech</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.Sc.">M.Sc.</option>
                                        <option value="M-Tech">M-Tech</option>
                                        <option value="Ph.D.">Ph.D.</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="branch">Branch</label>
                                    <select className="form-control" id="branch" name="branch" value={formData.branch} onChange={handleInputChange}>
                                        <option value="">Select Branch</option>
                                        <option value="MCA">MCA</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="Civil">Civil</option>
                                        <option value="Mathematics">Mathematics</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year</label>
                                    <select className="form-control" id="year" name="year" value={formData.year} onChange={handleInputChange}>
                                        <option value="">Select Year</option>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                        <option value="3rd">3rd</option>
                                        <option value="4th">4th</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalToggle}>Cancel</Button>
                            <Button variant="primary" type='submit'>Add</Button>
                        </Modal.Footer>
                        </form>
                        </Modal.Body>

                    </Modal>













                </div>


                {/* <Admin_Navbar/>  */}
                <div className="row mb-4">
                    <div className="col-sm-6 d-flex align-items-center">
                        <div className="dataTables_length bs-select" id="dtBasicExample_length">
                        <div className="d-flex align-items-center">
                                <label className="mb-0 mr-2">Show</label>
                                <select
                                    name="dtBasicExample_length"
                                    aria-controls="dtBasicExample"
                                    className="custom-select custom-select-sm form-control form-control-sm"
                                    style={{ width: "auto" }}
                                    value={entriesToShow}
                                    onChange={handleEntriesToShowChange}
                                >
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                                <label className="mb-0 ml-2">entries</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <form className="form-inline">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    style={{ width: "200px" }}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped" id="userTable">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Admin Name</th>
                                <th>Registration No</th>
                                <th>Position</th>
                                <th>AdminType</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                        {displayedEntries.map((student, index) => (
                                <tr key={index}>
                                    <td>{indexOfFirstEntry + index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.registrationNumber}</td>
                                    <td>{student.position}</td>
                                    <td>{student.adminType}</td>
                                    <td>
                                        <TrashFill size={24} style={{ color: 'red' }} />
                                    </td>
                                    <td>
                                        <PencilFill size={24} style={{ color: 'blue' }} />
                                    </td>
                                </tr>
                            ))}




                            {/* <tr>
                                <td>1</td>
                                <td>Jane Smith</td>
                                <td>2021002</td>
                                <td>President</td>
                                <td>
                                    <span className="badge bg-danger">Admin1</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>John Doe</td>
                                <td>2021001</td>
                                <td>Vice President</td>
                                <td>
                                    <span className="badge bg-success">Present</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>



                            <tr>
                                <td>3</td>
                                <td>Jane Smith</td>
                                <td>2021002</td>
                                <td>General Secratary</td>
                                <td>
                                    <span className="badge bg-danger">Admin1</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>2021001</td>
                                <td>Strategic & Planning Head</td>
                                <td>
                                    <span className="badge bg-success">Present</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>


                            <tr>
                                <td>2</td>
                                <td>Jane Smith</td>
                                <td>2021002</td>
                                <td>Media Head</td>
                                <td>
                                    <span className="badge bg-danger">Admin1</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>2021001</td>
                                <td>Web Head</td>
                                <td>
                                    <span className="badge bg-success">Present</span>
                                </td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr> */}

                            {/* Table rows */}
                        </tbody>
                    </table>

                    <div className="panel-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <div className="mb-2">
                                        Showing <b>{displayedEntries.length}</b> out of <b>{AttendanceData.length}</b> entries
                                    </div>
                                    <ul className="pagination">
                                        <li className="page-item" onClick={handlePreviousPage}>
                                            <a className="page-link" href="#">
                                                Previous
                                            </a>
                                        </li>
                                        {pageLinks}
                                        <li className="page-item" onClick={handleNextPage}>
                                            <a className="page-link" href="#">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
        </>

    );
};

export default AdminHeader;