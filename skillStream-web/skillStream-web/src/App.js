// import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Details } from "./pages/Details";
import { Login } from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import CoursesList from "./pages/coursesList";
import { Provider } from "react-redux";
import { store } from "./store";
import EnrollmentsList from "./pages/enrollments";
import RegisterUser from "./pages/registerUser";
import RegisterCourse from "./pages/registerCourse";
import { ToastContainer } from "react-toastify";
import EditCourse from "./pages/editCourse";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/details" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            children={
              <>
                <Route
                  path="/dashboard"
                  element={<Navigate to={"/dashboard/courses"} />}
                />
                <Route path="/dashboard/courses" element={<CoursesList />} />
                <Route
                  path="/dashboard/courses/register"
                  element={<RegisterCourse />}
                />
                <Route
                  path="/dashboard/courses/edit/:id"
                  element={<EditCourse />}
                />
                <Route path="/dashboard/users" element={<Users />} />
                <Route
                  path="/dashboard/users/register"
                  element={<RegisterUser />}
                />
                <Route
                  path="/dashboard/enrollments"
                  element={<EnrollmentsList />}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
