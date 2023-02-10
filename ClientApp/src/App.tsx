import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";
import { useIsAuthenticated } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App() {
    document.ontouchmove = function (e) {
        e.preventDefault();
    };
    const ingelogd = useIsAuthenticated();

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
