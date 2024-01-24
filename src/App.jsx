import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/auth/Login";
import PrivateRoute from "./Components/Home/PrivateRoute";
// import Page from "./Components/Home/page";
import Instagram from "./Components/Home/Instagram";
import InstagramPost from "./Components/Home/InstagramPost";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/page",
  //   element: <Page />,
  // },

  {
    path: "/instagramPost",
    element: <InstagramPost />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/instagram",
        element: <Instagram />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
