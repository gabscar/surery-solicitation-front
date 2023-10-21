import React from "react";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import SurgeryPage from "./pages/surgery-solicitation/list";
import { ModalProvider } from "./lib/context/modal/modal-provider";
import { Toaster } from "react-hot-toast";
import { StatusProvider } from "./lib/context/status/status-provider";

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
                <StatusProvider>
                    <RouterProvider router={router} />
                </StatusProvider>
            </ModalProvider>
        </React.StrictMode>
    );
}

export default App;
