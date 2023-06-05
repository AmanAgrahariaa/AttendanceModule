
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
// import { generateAdminListPDF } from './pdfGenerator'; // Import the function to generate the PDF

const AdminHeader = () => {
    const [showModal, setShowModal] = React.useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleReportClick = () => {
        // Call the function to generate the admin list PDF
        // generateAdminListPDF();
    };

    return (

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
                            {/* Modal content goes here */}
                            <form>
                                {/* Form fields */}
                                <div className="form-group">
                                    <label htmlFor="adminName">Admin Name</label>
                                    <input type="text" className="form-control" id="adminName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationNumber">Registration Number</label>
                                    <input type="text" className="form-control" id="registrationNumber" />
                                </div>
                                <div className="form-group mb-2 mt-2">
                                    <label>AdminType</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="Admin1" name="admin" value="Admin1" />
                                                <label className="form-check-label" htmlFor="Admin1">Admin1</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="Admin2" name="admin" value="Admin2" />
                                                <label className="form-check-label" htmlFor="Admin2">Admin2</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="branch">Position</label>
                                    <select className="form-control" id="branch">
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
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalToggle}>Cancel</Button>
                            <Button variant="primary">Add</Button>
                        </Modal.Footer>
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
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
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





                            <tr>
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
                            </tr>

                            {/* Table rows */}
                        </tbody>
                    </table>

                    <div className="panel-footer">
                        <div className="row">
                            <div className="col-sm-6 col-xs-6">
                                Showing <b>5</b> out of <b>25</b> entries
                            </div>
                            <div className="col-sm-6 col-xs-6">
                                <ul className="pagination hidden-xs pull-right">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item active" aria-current="page">
                                        <a className="page-link" href="#">
                                            1 <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
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
    );
};

export default AdminHeader;