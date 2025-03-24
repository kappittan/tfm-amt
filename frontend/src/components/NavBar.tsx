import { Button, Container, Nav, Navbar } from "react-bootstrap";

export function NavBar() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>CTIShield</Navbar.Brand>
          {username ? (
            <Nav>
              <Nav.Link href="#profile">
                Welcome <strong>{username}</strong>!
              </Nav.Link>
              <Button variant="danger">Log out</Button>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
