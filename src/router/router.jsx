import {
    createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoutes from "../ExtraRoutes/PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/profile/Profile";
import DashboardHome from "../pages/Dashboard/Home/DashboardHome";
import EditProfile from "../pages/Dashboard/profile/EditProfile";
import CreateDonationRequest from "../pages/Dashboard/DonationRequest/CreateDonationRequest";
import MyDonationRequest from "../pages/Dashboard/MyDonationReq/MyDonationRequest";
import EditDonationRequest from "../pages/Dashboard/MyDonationReq/EditDonationRequest";
import Forbidden from "../pages/forbidden/Forbidden";
import DonorRoute from "../ExtraRoutes/DonorRoute";
import AdminRoute from "../ExtraRoutes/AdminRoute";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllBloodDonationReq from "../pages/Dashboard/Admin/AllBloodDonationReq";
import EditDonationReqForAdmin from "../pages/Dashboard/Admin/EditDonationReqForAdmin";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import AdminAndVolunteerRoute from "../ExtraRoutes/AdminAndVolunteerRoute";
import SearchPage from "../pages/RootLayout/serachPage/SearchPage";
import BloodDonationreqPage from "../pages/RootLayout/BloodDonationReqPage/BloodDonationreqPage";
import DonationReqDetails from "../pages/RootLayout/DonationReqDetails";
import Blog from "../pages/blog/Blog";
import BlogDetails from "../pages/blog/BlogDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/searchPage',
                loader: ()=> fetch('/upazillaz.json'),
                Component: SearchPage
            },
            {
                path: '/bloodDonationReq',
                Component: BloodDonationreqPage
            },
            {
                path: '/blog',
                Component: Blog
            },
            {
                path: '/blogDetails/:id',
                Component: BlogDetails
            },
            {
                path: '/donationReqDetails/:id',
                element: <PrivateRoutes><DonationReqDetails></DonationReqDetails></PrivateRoutes>
            },
            {
                path: '/forbidden',
                Component: Forbidden
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                loader: () => fetch('./upazillaz.json'),
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'createDonationReq',
                loader: () => fetch('/upazillaz.json'),
                element: <DonorRoute><CreateDonationRequest></CreateDonationRequest></DonorRoute>
            },
            {
                path: 'myDonationReq',
                element: <DonorRoute><MyDonationRequest></MyDonationRequest></DonorRoute>
            },
            {
                path: 'donations/edit/:id',
                element: <DonorRoute><EditDonationRequest></EditDonationRequest></DonorRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'allBloodDonationReq',
                element: <AdminAndVolunteerRoute><AllBloodDonationReq></AllBloodDonationReq></AdminAndVolunteerRoute>
            },
            {
                path: 'donations/edit/admin/:id',
                element: <AdminRoute><EditDonationReqForAdmin></EditDonationReqForAdmin></AdminRoute>
            },
            {
                path: 'contentManagement',
                element: <AdminAndVolunteerRoute><ContentManagement></ContentManagement></AdminAndVolunteerRoute>
            },
            {
                path: 'contentManagement/addBlog',
                element: <AdminAndVolunteerRoute><AddBlog></AddBlog></AdminAndVolunteerRoute>
            }
        ]
    }

]);