import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";

const RegisterUser = () => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector((state) => state.register);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    age: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/dashboard/users";
      }, 2000);
    }
  }, [message]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Register a user
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  placeholder="Names of the user"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  placeholder="The email of the user"
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  placeholder="The password of the user"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">User role</Label>
                <Input
                  onChange={handleChange}
                  id="role"
                  name="role"
                  placeholder="The role of the user"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="age">Age</Label>
                <Input
                  onChange={handleChange}
                  id="age"
                  name="age"
                  placeholder="The age of the user"
                  type="number"
                />
              </FormGroup>
              <Alert color="success" isOpen={message}>
                {message}
              </Alert>
              <Button onClick={() => dispatch(apis.register(user))}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterUser;
