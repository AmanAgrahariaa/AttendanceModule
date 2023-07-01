import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import * as XLSX from 'xlsx';


const AdminHeader = () => {
    const [AttendanceData, setAttendanceData] = useState(null);
    const [filteredEntries, setFilteredEntries] = useState(null);
    const [ActiveEventsEnteries, setActiveEventsEnteries] = useState(null);

    const [showModal, setShowModal] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const initialState = {
        name: '',
       startDate:'',
       endDate:''
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Event');
            const responseData = await response.json();
            setAttendanceData(responseData);
            const ActivedisplayedEntries = responseData.filter(event => new Date(event.endDate) >= new Date());
            setActiveEventsEnteries(ActivedisplayedEntries);
            setFilteredEntries(ActivedisplayedEntries);
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


    // const entriesPerPage = entriesToShow;
    const dataLength = filteredEntries ? filteredEntries.length : 0;
    const totalPages = Math.ceil(dataLength / entriesToShow);
    const indexOfLastEntry = currentPage * entriesToShow;
    const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
    const displayedEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);


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

  


    const handleReportClick = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(ActiveEventsEnteries);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Active Event Report');
        const timestamp = Date.now();
        XLSX.writeFile(workbook, `admin_active_event_report_${timestamp}.xlsx`);
    };






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
    
// model submit for add
async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/addEvent', {
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



    // search related 
    const handleSearch = (e) => {
        e.preventDefault();

        if (searchQuery === '') {
            setFilteredEntries(ActiveEventsEnteries);
        } else {
            const filteredData = ActiveEventsEnteries.filter((event) =>
                event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEntries(filteredData);
        }
        setCurrentPage(1);
    };


    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value === '') {
            setFilteredEntries(ActiveEventsEnteries);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(e);
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
                                    <h2 className="mr-auto">Active Events</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 d-flex align-items-center justify-content-end">
                            <div className="d-flex ml-auto">
                                <Button variant="secondary" onClick={handleReportClick} style={{ marginRight: '10px' }}>Report</Button>
                                <Button variant="primary" onClick={handleModalToggle}>Add</Button>
                            </div>
                        </div>



                        {/* add active event */}
                        <Modal show={showModal} onHide={handleModalToggle}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add New Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* Modal content goes here */}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Event Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="startDate">Event Start Date</label>
                                        <input type="date" id="startDate" class="form-control" name="startDate" value={formData.startDate} onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="endDate">Event End Date</label>
                                        <input type="date" id="endDate" class="form-control" name="endDate" value={formData.endDate} onChange={handleInputChange}/>
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
                            <form className="form-inline" onSubmit={handleSearchSubmit}>
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
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped" id="userTable">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Event Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {displayedEntries.map((student, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstEntry + index + 1}</td>
                                        <td>{student.eventName}</td>
                                        <td>{student.startDate}</td>
                                        <td>{student.endDate}</td>
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
                                            Showing <b>{displayedEntries.length}</b> out of <b>{ActiveEventsEnteries.length}</b> entries
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