import { Navbar, Container, Nav, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Swords } from "lucide-react";
import { Outlet } from "react-router-dom";

function Layout() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="shadow-sm">
  <div className="container-fluid">
    <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
      <Swords className="text-primary" />
      Team Winter
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mx-auto d-flex align-items-center gap-3 flex-wrap flex-column flex-lg-row justify-content-center">
        <Nav.Link href="/attacks" className={currentPath === "/attacks" ? "text-black fw-bold" : ""}>Attacks</Nav.Link>
        {/* <Nav.Link href="/clans" className={currentPath === "/clans" ? "text-black fw-bold" : ""}>Clans</Nav.Link>
        <Nav.Link href="/stats" className={currentPath === "/stats" ? "text-black fw-bold" : ""}>Stats</Nav.Link>
        <Nav.Link href="/join" className={currentPath === "/join" ? "text-black fw-bold" : ""}>Join</Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>

            <div id="app">
                <main>
                    <Outlet />
                </main>
            </div>
            <footer className="py-5 bg-footer text-light">
                <Container>
                    <Row className="align-items-center text-center text-md-start">
                        <Col xs={12} md={6} className="mb-3 mb-md-0">
                            <h5 className="fw-bold">Team Winter</h5>
                            <p className="mb-0">Clash of Clans Elite Clan</p>
                        </Col>
                        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end gap-3 mt-3 mt-md-0">
                            <a href="#" className="text-light fs-5">
                                <i className="bi bi-youtube"></i>
                            </a>
                            <a href="#" className="text-light fs-5">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="text-light fs-5">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </Col>
                    </Row>
                    <hr className="border-secondary my-4" />
                    <Row className="align-items-center text-center text-md-start">
                        <Col xs={12} md={6} className="mb-3 mb-md-0">
                            <small>© 2023 Team Winter. Not affiliated with Supercell.</small>
                        </Col>
                        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#" className="text-light small text-decoration-none">Privacy</a>
                            <a href="#" className="text-light small text-decoration-none">Terms</a>
                            <a href="#" className="text-light small text-decoration-none">Contact</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Layout;