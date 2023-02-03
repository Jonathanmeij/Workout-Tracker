import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "react-auth-kit";

export default function App() {
    return (
        <div className=" bg-gray-900 text-white min-h-screen">
            <AuthProvider
                authType="cookie"
                authName="_auth"
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "https:"}
            >
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </AuthProvider>
        </div>
    );
}
