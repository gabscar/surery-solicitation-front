import React from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import SurgeryPage from "./pages/surgery-solicitation/list";
import { ModalProvider } from "./lib/context/modal/modal-provider";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SurgeryPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/surgery-solicitation",
        element: <SurgeryPage />,
        errorElement: <ErrorPage />,
    },
]);
function App() {
    return (
        <React.StrictMode>
            <Toaster />
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </React.StrictMode>
    );
}

export default App;
