import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack, Row, Col, NavDropdown, Button } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function BasicExample (props) {
    const { Profile1, username } = useParams(); // used for navigatine to home page
    const location = useLocation();
    // const { Profile1, username } = location.state || {};
    const navigate = useNavigate();

    const Profile1_text = `${Profile1}`;
    const username_text = `${username}`;


    const handleHome = () => {
   
        navigate(`/home/${Profile1}/${username}`);
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
                    <Navbar.Brand className="pr-2" href="./">Oceanic Airlines</Navbar.Brand>
                </Col>
                
            </Row>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    {/* <div className='box'></div> */}
                    {/* <Row>
                        <Col>
                            
                        </Col>
                        <Col>
                               
                        </Col>
                        <Col>3 of 3</Col>
                    </Row> */}
                    
                    {/* <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><span class="ml-3 text-xl">Tailblocks</span></a><nav class="md:ml-auto flex flex-wrap items-center text-base justify-center"><a class="mr-5 hover:text-gray-900">First Link</a><a class="mr-5 hover:text-gray-900">Second Link</a><a class="mr-5 hover:text-gray-900">Third Link</a><a class="mr-5 hover:text-gray-900">Fourth Link</a></nav><button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></button>
                    </div> */}
                    
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
                    <Stack direction="horizontal" gap={3}>
                        <div className="p-2"><Nav.Link onClick={handleHome}>Home</Nav.Link></div>
                        {/* <div className="p-2 ms-auto"><Nav.Link href="#link">Link</Nav.Link></div> */}
                        <div className="p-2 ms-auto">Second Item</div>
                        <div className="p-2">
                            <Button onClick={handleLogout} className = "d-none d-lg-block px-3" variant="outline-danger">Logout</Button>
                        </div>
                        {/* <div className="p-2">
                            <p>Profile: {Profile1_text}</p>
                            <p>username: {Profile1_text}</p>
                        </div> */}
                    </Stack>
                    
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>

    
  );
}

export default BasicExample;