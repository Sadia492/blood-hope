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
import BlogDetails from "../pages/Blog/BlogDetails";
import Funding from "../pages/Funding/Funding";
import DonationUpdate from "../pages/Dashboard/DonationUpdate";
import AdminRoute from "./AdminRoute";
import AdminMenu from "../pages/Dashboard/Admin/AdminMenu";
import ErrorPage from "../components/ErrorPage";
import Overview from "../pages/Dashboard/Overview";
// import DonorHome from "../pages/Dashboard/DonorHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/blood-donation-requests",
        element: <PendingDonationRequest></PendingDonationRequest>,
      },
      {
        path: "/donation/:id",
        element: <DonationDetails></DonationDetails>,
      },
      {
        path: "/donation/update/:id",
        element: (
          <PrivateRoute>
            <DonationUpdate></DonationUpdate>
          </PrivateRoute>
        ),
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // donor routes
      {
        index: true,
        element: <RoleBasedHome></RoleBasedHome>,
      },
      {
        path: "overview",
        element: <Overview></Overview>,
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyDonationRequests></MyDonationRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest></CreateDonationRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      // admin  routes
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      //admin and volunteer routes
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest></AllBloodDonationRequest>
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminRoute>
            <ContentManagement></ContentManagement>
          </AdminRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminRoute>
            <AddBlog></AddBlog>
          </AdminRoute>
        ),
      },
      {
        path: "donor-home",
        element: (
          <PrivateRoute>
            <DonorHome></DonorHome>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
