import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";

export default function App() {
    return (
        <div className=" bg-gray-900 text-white min-h-screen">
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </div>
    );
}
