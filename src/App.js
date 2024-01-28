import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout.js";
import SignIn from "./componants/signIn.js";
import Profile from "./componants/Profile.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Other from "./componants/Others.js";
import GoToPost from "./componants/GoToPost.js";
import MessageRoom from "./componants/messageRoom.js";
import Home from "./componants/Home.js";
import { client } from "./componants/http.js";
import ErrorHandling from "./componants/Error.js";


const router = createBrowserRouter(

  [
    { path: '/', element: <SignIn />,errorElement:<ErrorHandling/> },
    {path: '/layout/', element: <Layout />,errorElement:<ErrorHandling/> ,children: [{
        path: "profile", element: <Profile />
      }, {
        path: ":id", element: <Other />
      }, {
        path: "GoToPost/:id", element: <GoToPost />
      }, {path:"Chat/:id",element:<MessageRoom/>

      },{
        path:"Home",element:<Home/>
      }
      ]
    }])


function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>    </>
  );
}

export default App;
