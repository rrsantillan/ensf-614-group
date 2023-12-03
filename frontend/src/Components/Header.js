import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack, Row, Col, NavDropdown, Button } from 'react-bootstrap';
import { useParams, useNavigate, useLocation, useState } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    // const { Profile1, username } = location.state || {};
    const navigate = useNavigate();

    const { Profile1, username } = props; // used for navigating to home page

    const toHome = `/home/${Profile1}/${username}`

    const handleHome = () => {
        // if (username === 'guest'){

        // }
        console.log(toHome)
        navigate(`../home/${Profile1}/${username}`);
    };
    
    const handleLogout = () => {
        
        navigate('/');
    };
    
    const handleGoBack = () => {
        navigate(-1); // Go back one step in the history
    };
    

  return (
    <Navbar expand="lg" className="bg-primary-subtle">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container>
            <Button onClick={handleGoBack} className = "d-none d-lg-block" variant="outline-info">⇦ Back</Button>
            
            <Row>
                <Col className='mx-3'>
                    {/* <div className= "navbar-spacer"></div>
                    <div className='box'></div> */}
                </Col>
                <Col>
                    <Navbar.Brand className="pr-2" href={toHome} >Oceanic Airlines</Navbar.Brand>
                    {/* <Navbar.Brand className="pr-2" to={`/home/${Profile1}/${username}`} >Oceanic Airlines</Navbar.Brand> */}
                </Col>
                
            </Row>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <Row>
                        <Col>
                        
                        </Col>
                        <Col>
                               
                        </Col>
                        <Col></Col>
                    </Row>
                    
                    <Stack direction="horizontal" gap={5}>
                        <div className="px-2"><Nav.Link onClick={handleHome}>Home</Nav.Link></div>
                        {/* <div className="p-2 ms-auto"><Nav.Link href="#link">Link</Nav.Link></div> */}
                        <div className="px-2 ms-auto"></div>
                        <div className='navbar-spacer'></div>
                        <div className="px-2">
                            <Button onClick={handleLogout} className = "d-none d-lg-block px-3" variant="outline-danger">Logout</Button>
                        </div>
                    </Stack>
                    
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>

    
  );
}

export default Header;