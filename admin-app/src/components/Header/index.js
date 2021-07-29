import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions";
import { isMobile } from "react-device-detect";

function Header() {
  const [user, setUser] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     setUser(user.firstName);
  //   }
  // }, [user])
  
  const renderLoggedInLinks = () => {

    if (isMobile) {
      return (
        <Nav>

          <li className="nav-item">
            <NavLink exact to={`/`} className="nav-link">Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={`/page`} className="nav-link">Page</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={`/categories`} className="nav-link">Categories</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={`/products`} className="nav-link">Products</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={`/orders`} className="nav-link">Orders</NavLink>
          </li>


          <li className="nav-item">
            <span className="nav-link" onClick={logout} style={{ cursor: 'pointer' }} >
              Signout
            </span>
          </li>
        </Nav >
      )
    }

    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout} style={{ cursor: 'pointer', float: 'right' }} >
            Signout
              </span>
        </li>
      </Nav>
    );
  };
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      variant="dark"
      style={{
        zIndex: 1,
        backgroundColor: "#252d47",
        boxShadow: "inset 0 0 2px rgb(89, 94, 143)",
      }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Hello {auth.user.firstName}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
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
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
