import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./UI/Home.jsx";
import Menu, { loader as menuLoader } from "./Features/Meanu/Menu.jsx";
import { action as updatepriorityaction } from "./Features/Order/UpdatePriority.jsx";
import Cart from "./Features/Cart/Cart.jsx";
import CreateOrder, {
  action as orderAction,
} from "./Features/Order/CreateOrder.jsx";
import Order, { loader as orderloader } from "./Features/Order/Order.jsx";
import Applayout from "./UI/Applayout.jsx";
import Error from "./UI/Error.jsx";
const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: orderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderloader,
        errorElement: <Error />,
        action: updatepriorityaction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
