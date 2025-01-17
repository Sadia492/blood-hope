import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import DonorHome from "../pages/Dashboard/Donor/DonorHome";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import SharedHome from "../pages/Dashboard/SharedHome";
import RoleBasedHome from "../pages/Dashboard/RoleBasedHome";
// import DonorHome from "../pages/Dashboard/DonorHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <RoleBasedHome></RoleBasedHome>,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      // {
      //   index: true,
      //   element: <SharedHome></SharedHome>,
      // },
    ],
  },
]);
export default router;
