import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class api {
  resetAll = createAction("resetAll");

  getusers = createAsyncThunk(
    "admin/getusers",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/admin/users");
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  register = createAsyncThunk("register", async (data, { rejectWithValue }) => {
    try {
      console.log(data, "data");
      const response = await axios.post("/register", { ...data });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: error?.response?.data?.message });
    }
  });

  login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post("/login", { ...data });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: error?.response?.data });
    }
  });

  deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/admin/users/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  // Courses apis
  getcourses = createAsyncThunk(
    "getcourses",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/course");
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  createCourse = createAsyncThunk(
    "createCourse",
    async (data, { rejectWithValue }) => {
      try {
        console.log(data, "data");
        const response = await axios.post("/course", { ...data });
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  getcourse = createAsyncThunk("getcourse", async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/course/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: error?.response?.data?.message });
    }
  });

  deletecourse = createAsyncThunk(
    "deletecourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/course/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  searchcourse = createAsyncThunk(
    "searchcourse",
    async (title, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/course/searchByTitle/${title}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  updateCourse = createAsyncThunk(
    "updateCourse",
    async (data, { rejectWithValue }) => {
      try {
        console.log(data, "data");
        const response = await axios.patch(`/course/${data.id}`, { ...data });
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  // Enrollments apis
  getenrollments = createAsyncThunk(
    "getenrollments",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/enrollment");
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  createEnrollment = createAsyncThunk(
    "createEnrollment",
    async (data, { rejectWithValue }) => {
      try {
        console.log(data, "data");
        const response = await axios.post("/enrollment", { ...data });
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  getenrollment = createAsyncThunk(
    "getenrollment",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  getenrollmentbyUser = createAsyncThunk(
    "getenrollmentbyUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/user/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  getenrollmentbycourse = createAsyncThunk(
    "getenrollmentbycourse",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/enrollment/course/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
        return rejectWithValue({ error: error?.response?.data?.message });
      }
    }
  );

  leave = createAsyncThunk("leave", async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/enrollment/leave/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ error: error?.response?.data?.message });
    }
  });
}

export const apis = new api();
