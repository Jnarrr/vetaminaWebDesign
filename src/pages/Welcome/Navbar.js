import { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import {BrowserRouter as Router, Link} from "react-router-dom";


export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

 

  return (
      <Router>
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
          <Container>
            <Navbar.Brand >
            <img src="./images/logo.png" alt="" className="logo2" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
             
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Router>
  )
}