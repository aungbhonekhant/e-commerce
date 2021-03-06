import React from "react";
//import { Container } from "react-bootstrap";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { isMobile } from "react-device-detect";
import './style.css';

function Layout(props) {
  return (
    <>
      <Header />

      {
          !isMobile &&
          props.sidebar ?
          <Container fluid>
            <Row className="">
              <Col md={2} className="sidebar">
                <ul className="mt-5">
                  <li>
                    <NavLink exact to={`/`}>Home</NavLink>
                  </li>

                  <li>
                    <NavLink to={`/page`}>Page</NavLink>
                  </li>

                  <li>
                    <NavLink to={`/categories`}>Categories</NavLink>
                  </li>

                  <li>
                    <NavLink to={`/products`}>Products</NavLink>
                  </li>

                  <li>
                    <NavLink to={`/brands`}>Brands</NavLink>
                  </li>

                  <li>
                    <NavLink to={`/orders`}>Orders</NavLink>
                  </li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
                {props.children}
              </Col>
            </Row>
          </Container>
          :

          <Col style={{ marginLeft: "auto", paddingTop: "60px" }}>
            {props.children}
          </Col>
      }
    </>
  );
}

export default Layout;
