import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "react-auth-kit";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";
import { useIsAuthenticated } from "react-auth-kit";

export default function App() {
    document.ontouchmove = function (e) {
        e.preventDefault();
    };
    const ingelogd = useIsAuthenticated();

    return (
        <div className="min-h-screen text-white bg-gray-900 font-inter overscroll-none">
            <ScrollToTop />

            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
            {ingelogd() ? <MobileNavbar /> : null}
        </div>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
