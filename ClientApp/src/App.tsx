import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "react-auth-kit";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";

export default function App() {
    document.ontouchmove = function (e) {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen text-white bg-gray-900 font-inter overscroll-none">
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
                <MobileNavbar />
            </AuthProvider>
        </div>
    );
}
