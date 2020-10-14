import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';


const NavBar = () => (
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link href="/">Bio</Nav.Link>
      <Nav.Link href="/albums">Albums</Nav.Link>
    </Nav>
  </Navbar>
)

export default NavBar;