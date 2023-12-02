import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

function BasicExample() {
    const navigate = useNavigate();
    const handleLogout = () => {
   
        navigate('/');
    };
      
    const handleGoBack = () => {
        navigate(-1); // Go back one step in the history
    };


  return (
    <Navbar expand="lg" className="bg-primary-subtle">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Brand className="pr-2" href="./">Oceanic Airlines</Navbar.Brand>
            

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <div className='box'></div>
                    <Row>
                        <Col>
                            <Button onClick={handleGoBack} variant="outline-info">⇦ Back</Button>
                        </Col>
                        <Col>
                               
                        </Col>
                        <Col>3 of 3</Col>
                    </Row>
                    
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>
  );
}

export default BasicExample;