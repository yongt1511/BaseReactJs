import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login"
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
]);
