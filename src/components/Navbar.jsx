import React from 'react';
import Champions from './Champions';
import MainSearch from './MainSearch';

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

  
function NavBar() {
    return (
      <>
        <Navbar variant="dark" expand="lg" fixed="top">
          <Container className="nav-wrapper">
            <Navbar.Brand className="navbar-brand d-lg-none">
              {/* <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top logo-img"
                  /> */}
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link>
                  <NavLink className="navlink" to="/">
                   | Strona główna  | 
                  </NavLink>
                </Nav.Link>

                <Nav.Link>
                  <NavLink className="navlink" to="/champions">
                    | Champions |
                  </NavLink>
                </Nav.Link>
                  <NavDropdown.Divider />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/champions" element={<Champions />} />
        </Routes>
      </>
    );
  }
  
export default NavBar;