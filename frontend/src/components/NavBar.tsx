import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>CTIShield</Navbar.Brand>
          <Row>
            {username ? (
              <>
                <Col>
                  <Navbar.Text>
                    Welcome <a href="#login">{username}</a>
                  </Navbar.Text>
                </Col>
                <Col>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      localStorage.removeItem("username");
                      localStorage.removeItem("token");
                      localStorage.removeItem("user_id");
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Nav>
                    <Nav.Link href="/">Log In</Nav.Link>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                  </Nav>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}
