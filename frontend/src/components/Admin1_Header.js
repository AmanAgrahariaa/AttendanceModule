





import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import AddStudent from './MemberList';
import AddAdmin from './AdminList';
import Admin1_home from './Admin1_home';
import CurrentList from './CurrentEvent';
import PastList from './PastEvent';


const Navigation = () => {
  const [activeTab, setActiveTab] = useState('admin1Home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ padding: '2px' }}>
        <Container>
          <Navbar.Brand>
            <img alt="logo" src="nss_nav.png" style={{ maxHeight: '70px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link
                as={Link}
                to="/home"
                onClick={() => handleTabChange('admin1Home')}
                className={activeTab === 'admin1Home' ? 'active' : ''}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/Student"
                onClick={() => handleTabChange('addStudent')}
                className={activeTab === 'addStudent' ? 'active' : ''}
              >
                Member
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/Admin"
                onClick={() => handleTabChange('addAdmin')}
                className={activeTab === 'addAdmin' ? 'active' : ''}
              >
                Admin
              </Nav.Link>

              <NavDropdown
                title="Event"
                id="basic-nav-dropdown"
                onSelect={(eventKey) => handleTabChange(eventKey)}
                className={
                  activeTab === 'CurrentEvent' || activeTab === 'PastEvent' ? 'active' : ''
                }
              >
                <NavDropdown.Item as={Link} to="/currentEvent">
                  Current Event
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pastEvent">
                  Past Event
                </NavDropdown.Item>
              </NavDropdown>

              <Button variant="outline-dark" className="ml-2">
                Logout
              </Button>
              {/* <span className="account-symbol">John Doe</span> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/home" element={<Admin1_home />} />
          <Route path="/Student" element={<AddStudent />} />
          <Route path="/Admin" element={<AddAdmin />} />
          <Route path="/currentEvent" element={<CurrentList />} />
          <Route path="/pastEvent" element={<PastList />} />
        </Routes>
      </div>
    </>
  );
};

export default Navigation;
