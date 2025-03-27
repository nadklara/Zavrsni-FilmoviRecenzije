import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RouteNames, PRODUKCIJA } from '../constants';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import useAuth from '../hooks/useAuth';


export default function NavBarEdunova(){

    const navigate = useNavigate();
    const { logout, isLoggedIn, isAdmin } = useAuth();
    
    function OpenSwaggerURL(){
      window.open(PRODUKCIJA + "/swagger/index.html", "_blank")
    }

    return(
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
       <Container className="fluid">
       <Navbar.Brand href="/">Filmovi recenzije</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        {isLoggedIn ? (
                      <>                    
              <Nav className="me-auto">
                <Nav.Link onClick={()=>navigate(RouteNames.HOME)}>Početna</Nav.Link>
                <Nav.Link onClick={()=>navigate(RouteNames.FILMOVI_PREGLED)}>Pregledaj filmove</Nav.Link>
                <Nav.Link onClick={()=>navigate(RouteNames.RECENZIJE_PREGLED)}>Pregledaj svoje recenzije</Nav.Link>
                {isAdmin && (
                <NavDropdown title="ADMIN" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>navigate(RouteNames.ADMIN_FILMOVI_PREGLED)}>Pregledaj filmove</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RouteNames.ADMIN_FILMOVI_NOVO)}>Dodaj novi film</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RouteNames.ADMIN_RECENZIJE_PREGLED)}>Pregled recenzija</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RouteNames.ADMIN_GLUMCI_PREGLED)}>Pregled glumaca</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate(RouteNames.ADMIN_KORISNICI_PREGLED)}>Pregled korisnika</NavDropdown.Item>
                </NavDropdown>
                )}
              </Nav>
            <Nav.Link onClick={()=>OpenSwaggerURL()}>Swagger</Nav.Link>
            <Nav.Link onClick={logout}>Odjava</Nav.Link>
            </>
                  ) : (
                <Nav.Link onClick={() => navigate(RouteNames.LOGIN)}>
                  Prijava
                </Nav.Link>
                  )}

                  

        </Navbar.Collapse>
       </Container>
    </Navbar>
    );
}