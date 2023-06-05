
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal } from 'react-bootstrap';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';

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

                    <Modal show={showModal} onHide={handleModalToggle}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Modal content goes here */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="studentName">Student Name</label>
                                    <input type="text" className="form-control" id="studentName" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationNumber">Registration Number</label>
                                    <input type="text" className="form-control" id="registrationNumber" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="branch">Branch</label>
                                    <select className="form-control" id="branch">
                                        <option value="">Select Branch</option>
                                        <option value="branch1">Branch 1</option>
                                        <option value="branch2">Branch 2</option>
                                        <option value="branch3">Branch 3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="branch">Batch</label>
                                    <select className="form-control" id="branch">
                                        <option value="">Select Batch</option>
                                        <option value="branch1">Batch 1</option>
                                        <option value="branch2">Batch 2</option>
                                        <option value="branch3">Batch 3</option>
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
                                <th>Registration No</th>
                                <th>Student Name</th>
                                <th>Branch</th>
                                <th>Batch(Year)</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

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
            </div >
        </div >
    );
};

export default AdminHeader;