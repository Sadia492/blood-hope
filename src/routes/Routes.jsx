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
import AllUser from "../pages/Dashboard/Admin/AllUser";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest";
import DonationDetails from "../pages/Dashboard/DonationDetails";
import ContentManagement from "../pages/Dashboard/ContentManagement";
import AddBlog from "../pages/Dashboard/AddBlog";
import Search from "../pages/Search/Search";
import PendingDonationRequest from "../pages/PendingDonationRequest/PendingDonationRequest";
import Blog from "../pages/Blog/Blog";
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
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/blood-donation-requests",
        element: <PendingDonationRequest></PendingDonationRequest>,
      },
      {
        path: "/donation/:id",
        element: <DonationDetails></DonationDetails>,
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
      {
        path: "all-users",
        element: <AllUser></AllUser>,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog></AddBlog>,
      },
    ],
  },
]);
export default router;
