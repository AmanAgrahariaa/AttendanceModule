import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import AddStudent from './MemberList';
import AddAdmin from './AdminList';
import Admin1_home from './Admin1_home';
import CurrentList from './CurrentEvent';
import PastList from './PastEvent';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('admin1Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'addStudent':
        return <AddStudent />;
      case 'addAdmin':
        return <AddAdmin />;
      case 'admin1Home':
        return <Admin1_home />;
      case 'CurrentEvent':
        return <CurrentList />;
      case 'PastEvent':
        return <PastList />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ padding: '2px' }}>
        <Container>
          <Navbar.Brand href="/">
            <img alt="logo" src="logo_new.png" style={{ maxHeight: '70px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link
                onClick={() => setActiveTab('admin1Home')}
                className={activeTab === 'admin1Home' ? 'active' : ''}
              >
                Home
              </Nav.Link>

              <Nav.Link
                onClick={() => setActiveTab('addStudent')}
                className={activeTab === 'addStudent' ? 'active' : ''}
              >
                Member
              </Nav.Link>

              <Nav.Link
                onClick={() => setActiveTab('addAdmin')}
                className={activeTab === 'addAdmin' ? 'active' : ''}
              >
                Admin
              </Nav.Link>

              <NavDropdown
                title="Event"
                id="basic-nav-dropdown"
                onSelect={(eventKey) => setActiveTab(eventKey)}
                className={activeTab === 'CurrentEvent' || activeTab === 'PastEvent' ? 'active' : ''}
              >
                <NavDropdown.Item eventKey="CurrentEvent">Current Event</NavDropdown.Item>
                <NavDropdown.Item eventKey="PastEvent">Past Event</NavDropdown.Item>
              </NavDropdown>

              <Button variant="outline-dark" className="ml-2">Logout</Button>
              {/* <span className="account-symbol">John Doe</span> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        {renderContent()}
      </div>
    </>
  );
};

export default Navigation;




