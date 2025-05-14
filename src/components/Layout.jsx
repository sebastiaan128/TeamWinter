import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Swords } from "lucide-react";
import { Outlet } from "react-router-dom";

function Layout() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
        <Navbar collapseOnSelect expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="mx-auto d-flex align-items-center gap-4 flex-wrap">
                        <Navbar.Brand className="gap-2 d-flex align-items-center" href="/">
                            <Swords className="text-primary" />Team Winter
                        </Navbar.Brand>
                        <Nav className="d-flex gap-3 justify-content-center">
                            <Nav.Link href="/attacks" className={currentPath === "/attacks" ? "text-black fw-bold" : ""}>Info</Nav.Link>
                            <Nav.Link href="/clans" className={currentPath === "/clans" ? "text-black fw-bold" : ""}>Clans</Nav.Link>
                            <Nav.Link href="/stats" className={currentPath === "/stats" ? "text-black fw-bold" : ""}>Stats</Nav.Link>
                            <Nav.Link href="/join" className={currentPath === "/join" ? "text-black fw-bold" : ""}>Join</Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>

            <div id="app">
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout;