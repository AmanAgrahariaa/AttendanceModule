import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import Navbar from './Admin1_Header'

const AdminHeader = () => {
    const [AttendanceData, setAttendanceData] = useState(null);
    const [showModal, setShowModal] = React.useState(false);

    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState('');
    const setSearchQuery = (e)=>{
        setSearch(e.target.value);
    }

    useEffect(() => {
      fetchData();
    }, []);
  
 

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/home');
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


    return (
<>
{/* <Navbar/> */}
        <div className="d-flex align-items-start justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="container">

                <div className="row mb-4">
                    <div className="col-sm-6 d-flex align-items-center">
                        <div className="dataTables_length bs-select" id="dtBasicExample_length">
                            <div className="d-flex align-items-center">
                                <h2 className="mr-auto">Attendance List</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <div className="d-flex flex-wrap justify-content-end align-items-center">


                            <Button variant="primary">Generate Report</Button>
                        </div>
                    </div>
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
                                    <option value="">Active Events</option>
                                    {/* Add active events options here */}
                                </select>
                            </div>

                            <div className="form-group mr-2 mb-2">
                                <select className="form-control">
                                    <option value="">Past Events</option>
                                    {/* Add past events options here */}
                                </select>
                            </div>

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

                    <div className="col-sm-6 d-flex align-items-center justify-content-end">
                        <form className="form-inline" onSubmit={setSearchQuery}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={setSearchQuery}
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
                                <th>Student Name</th>
                                <th>Registration No</th>
                                <th>Branch</th>
                                <th>Participation</th>
                                <th>Batch(Year)</th>
                                <th>Admin2</th>
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
                                    <td>{student.course}</td>
                                    <td>
                                        <span className={`badge ${student.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>{student.year}</td>
                                    <td>{student.position}</td>
                                    <td>
                                        <TrashFill size={24} style={{ color: 'red' }} />
                                    </td>
                                    <td>
                                        <PencilFill size={24} style={{ color: 'blue' }} />
                                    </td>
                                </tr>
                            ))}
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
        </div>
        </>
    );
};

export default AdminHeader;