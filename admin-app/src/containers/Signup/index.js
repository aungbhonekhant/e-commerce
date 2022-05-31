import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "../../components/UI/input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import Animation from '../../components/LoginAnimation';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  },[user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  const message = () => {
    return(
      <Alert variant="info" style={{background: 'linear-gradient(90deg, rgba(3,113,117,1) 0%, rgba(54,148,161,1) 12%, rgba(13,181,214,1) 100%)', color: '#fff', textAlign: 'center'}} >{user.message}</Alert>
    )
  }

  return (
    <Layout>
      <Container fluid>
        
        <Row style={{ marginTop: "170px" }}>
          <Col md={{ span: 4, offset: 4 }}>
            {user.message ? message() : null}
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="Enter First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus="autoFocus"
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Enter Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                placeholder="Enter Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-info" type="submit">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Animation />
    </Layout>
  );
}

export default Signup;
