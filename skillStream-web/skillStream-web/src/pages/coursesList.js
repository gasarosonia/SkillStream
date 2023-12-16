import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
  ButtonGroup,
  Alert,
  Spinner,
} from "reactstrap";
import CustomTable from "../components/customTable";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";

const tableHeaders = [
  {
    key: 1,
    header: "Course title",
  },
  {
    key: 2,
    header: "Course Length",
  },
  {
    key: 3,
    header: "Instructor",
  },
  {
    key: 4,
    header: "Actions",
  },
];

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.getCourses);
  const { message, loading } = useSelector((state) => state.deletecourse);

  useEffect(() => {
    dispatch(apis.getcourses());
  }, []);
  console.log(courses);

  return (
    <div>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Courses</CardTitle>
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
                  {courses &&
                    courses.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{course.title}</td>
                          <td>{course.length}</td>
                          <td>{course.instructor}</td>
                          <td>
                            <ButtonGroup>
                              <Link
                                to={{
                                  pathname: `/dashboard/courses/edit/${course.id}`,
                                  state: { course },
                                }}
                              >
                                <Button
                                  color="success"
                                  size="sm"
                                  onClick={() =>
                                    dispatch(apis.getcourse(course.id))
                                  }
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                </Button>
                              </Link>
                              <Button
                                onClick={() => {
                                  dispatch(apis.deletecourse(course.id));
                                  dispatch(apis.getcourses());
                                }}
                                color="danger"
                                size="sm"
                              >
                                {loading ? (
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
              to="/dashboard/courses/register"
            >
              Add course
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CoursesList;
