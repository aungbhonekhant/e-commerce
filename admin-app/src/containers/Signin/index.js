import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "../../components/UI/input";
import { Login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Animation from '../../components/LoginAnimation';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(Login(user));
  };

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container fluid>
        <Row style={{ marginTop: "170px" }}>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email address"
                placeholder="Enter Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus="autoFocus"
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-info" type="submit">
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Animation />
    </Layout>
  );
}

export default Signin;
