import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
  ButtonGroup,
  Spinner,
  Alert,
} from "reactstrap";
import CustomTable from "../components/customTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";

const tableHeaders = [
  {
    key: 1,
    header: "S/N",
  },
  {
    key: 2,
    header: "Names",
  },
  {
    key: 3,
    header: "Email",
  },
  {
    key: 4,
    header: "Age",
  },
  {
    key: 5,
    header: "Role",
  },
  {
    key: 6,
    header: "Actions",
  },
];

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.adminGetUsers);
  const { loading: deletingUser, message } = useSelector(
    (state) => state.deleteUser
  );

  console.log(users);
  useEffect(() => {
    dispatch(apis.getusers());
  }, []);

  return (
    <div>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Users</CardTitle>
              <Alert color="success" isOpen={message}>
                {message}
              </Alert>
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    {tableHeaders.map((item, index) => {
                      return <th key={index}>{item.header}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center p-2">
                              <h6>{user.id}</h6>
                            </div>
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.age}</td>
                          <td>{user.role}</td>
                          <td>
                            <ButtonGroup>
                              {/* <Link
                                to={{
                                  pathname: `/dashboard/editUser/${index + 1}`,
                                  state: { user },
                                }}
                              >
                                <Button color="success" size="sm">
                                  <i className="bi bi-pencil-fill"></i>
                                </Button>
                              </Link> */}
                              <Button
                                onClick={() => {
                                  dispatch(apis.deleteUser(user.id));
                                  dispatch(apis.getusers());
                                }}
                                color="danger"
                                size="sm"
                              >
                                {deletingUser ? (
                                  <Spinner />
                                ) : (
                                  <i className="bi bi-trash-fill"></i>
                                )}
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col lg="12">
          <Button color="primary" className="mt-3">
            <Link
              className="text-decoration-none text-light"
              to="/dashboard/users/register"
            >
              Add user
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Users;
