import { createBrowserRouter } from "react-router-dom";
import Navbar from "../SharedStyle/Navbar";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import SignUp from "../Pages/Home/SignUp/SignUp";
import AddArticleForm from "../AddArticleForm/AddArticleForm";
import AllArticlesPage from "../AllArticlesPage/AllArticlesPage";
import Newsdetails from "../Pages/NewsDetails/Newsdetails";
import SubscriptionPage from "../Pages/SubscriptionPage/SubscriptionPage";


import Payment from "../Pages/SubscriptionPage/Payment";
import UpdateDetails from "../Pages/NewsDetails/UpdateDeatails/UpdateDeatails";
import MyArticles from "../Pages/MyAricles/MyArticles";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AllUsersPage from "../Pages/Dashboard/AllUsersPage/AllUsersPage";
import AllArticles from "../Pages/Dashboard/AllArticlesPage/AllArticles";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import SubscriptionSuccess from "../Pages/SubscriptionPage/SubscriptionSuccess";
import ProfilePage from "../Pages/Profile/ProfilePage";
import Dashbaord from "../Pages/Dashboard/Dashbaord/Dashbaord";
import Premium from "../Pages/Primium/Premium";
import AllPublishers from "../Pages/Dashboard/AdminDashboard/All Publisher/AllPublihser";
import Error from "../Pages/Error/Error";




export const router = createBrowserRouter([
    {
      path: "/",
      element:<Mainlayout></Mainlayout>,
      errorElement:<Error></Error>,
      children:[{
        path:"/",
        element:<Home></Home>

      },
      {
        path:'/profile',
        element:<ProfilePage></ProfilePage>
      },
    {
        path: '/login',
        element:<Login></Login>
    },
{
    path:'/signup',
    element:<SignUp></SignUp>

},
{
    path:'/add-articles',
    element:<AddArticleForm></AddArticleForm>
},
{
    path:'/all-articles',
    element:<AllArticlesPage></AllArticlesPage>
},
{
    path:'/article/:id',
    element:<Newsdetails></Newsdetails>
},
{
    path:'/subscription',
    element:<SubscriptionPage></SubscriptionPage>
},
{
    path: '/payment',
    element:<Payment></Payment>
},
{
    path:'/edit-article/:id',
    element:<UpdateDetails></UpdateDetails>
},
{
    path: '/my-articles',
    element:<MyArticles></MyArticles>
},
{
    path: '/premium',
    element:<Premium></Premium>
},
{
    path:'/dashboard',
    element:<Dashbaord><AdminDashboard></AdminDashboard></Dashbaord>,
    children:[
        {
            path: '/dashboard',
            element:<AdminDashboard></AdminDashboard>

        },
        {
            path: 'admin/users',
            element:<AllUsersPage></AllUsersPage>
        
        },
        {
            path: 'admin/all-publisher',
            element:<AllPublishers></AllPublishers>
        },
        { 
            path:'admin/articles',
            element:<AllArticles></AllArticles>
        
        },
        {
            path: 'admin/publishers',
            element:<AddPublisher></AddPublisher>
        },
        
      

    ]

},

{
    path:'/subscription-success',
    element: <SubscriptionSuccess></SubscriptionSuccess>
}


]
    },
  ]);
  
