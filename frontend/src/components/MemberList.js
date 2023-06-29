
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Navbar from './Admin1_Header'


const AdminHeader = () => {

    const [AttendanceData, setAttendanceData] = useState(null);
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [showModal, setShowModal] = React.useState(false);
    const initialState = {
        name: '',
        registrationNumber: '',
        email: '',
        course: '',
        branch: '',
        year: ''

        // {name, registrationNumber, email, course, branch, year} 
    };

    const [formData, setFormData] = useState(initialState);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Student');
            const responseData = await response.json();
            setAttendanceData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    if (!AttendanceData) {
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




    // add member start

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };




    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:5000/api/add-student', {
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
      


// add member end









// generate report 

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
        const timestamp = Date.now();
        XLSX.writeFile(workbook, `member_report_${timestamp}.xlsx`);

    };

    


    // search box

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
        if(searchQuery ==='')
        {
            fetchData();
        }

      const response = await fetch('http://localhost:5000/api/Student/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({searchQuery}),
      });
  
      const data = await response.json();
  
      // Handle the data received from the backend, e.g., update state or perform further operations
      // console.log('Response from backend:', data);
  
      // Reset the search query
    //   setSearchQuery('');
  
      // Update student data to render the updated list
      if (!data) {
        return <div>Search Not Found...</div>;
    }

      setAttendanceData(data);

    } catch (error) {
      console.log('Error sending data to backend:', error);
    }
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
                                <h2 className="mr-auto">Member List</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <div className="d-flex ml-auto">
                            <Button variant="secondary" onClick={handleReportClick} style={{ marginRight: '10px' }}>Report</Button>
                            <Button variant="primary" onClick={handleModalToggle}>Add</Button>
                        </div>
                    </div>











                    {/* model for add student */}
                    <Modal show={showModal} onHide={handleModalToggle}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Modal content goes here */}
                            {/* {name, registrationNumber, email, course, branch, year}  */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Student Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationNumber">Registration Number</label>
                                    <input type="text" className="form-control" id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email </label>
                                    <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
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
                                    <Button variant="primary" type="submit">Add</Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal>


                    {/* end of model for add student */}










                </div>
                <div className="row mb-4">
                    <div className="col-sm-6">
                        <div className="dataTables_length bs-select" id="dtBasicExample_length">
                            <div className="d-flex align-items-center">
                                <h4 className="mr-auto">Add Filter</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <div className="d-flex flex-wrap">
                            <div className="form-group mr-2 mb-2">
                                <select className="form-control">
                                    <option value="">Branch</option>
                                    {/* Add branch options here */}
                                </select>
                            </div>

                            <div className="form-group mr-2 mb-2">
                                <select className="form-control">
                                    <option value="">Batch</option>
                                    {/* Add batch options here */}
                                </select>
                            </div>
                        </div>
                    </div>
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









{/* search box start */}
                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <form className="form-inline" onSubmit={handleSearchFormSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    style={{ width: "200px" }}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

{/* search box end */}










                </div>

                <div className="table-responsive">
                    <table className="table table-striped" id="userTable">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Registration No</th>
                                <th>Student Name</th>
                                <th>Branch</th>
                                <th>Batch(Year)</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                            {displayedEntries.map((student, index) => (
                                <tr key={index}>
                                    <td>{indexOfFirstEntry + index + 1}</td>
                                    <td>{student.registrationNumber}</td>
                                    <td>{student.name}</td>

                                    <td>{student.branch}</td>
                                    <td>{student.year}</td>
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
                                <td>2021002</td>
                                <td>Jane Smith</td>
                                <td>Electrical Engineering</td>
                                <td>2022</td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>2021001</td>
                                <td>John Doe</td>
                                <td>Computer Science</td>
                                <td>2021</td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>


                            <tr>
                                <td>1</td>
                                <td>2021002</td>
                                <td>Jane Smith</td>
                                <td>Electrical Engineering</td>
                                <td>2022</td>
                                <td>
                                    <TrashFill size={24} style={{ color: 'red' }} />
                                </td>
                                <td>
                                    <PencilFill size={24} style={{ color: 'blue' }} />
                                </td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>2021001</td>
                                <td>John Doe</td>
                                <td>Computer Science</td>
                                <td>2021</td>
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
            </div >
        </div >
</>

    );
};

export default AdminHeader;