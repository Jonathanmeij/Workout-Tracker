import { cva } from "class-variance-authority";
import DrawerHeader from "./DrawerHeader";

interface DrawerProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

export default function Drawer({ children, open, onClose }: DrawerProps) {
    return (
        <>
            <div className={`fixed top-0 left-0 z-50`}>
                <div
                    className={`fixed right-0 top-0 z-50 h-screen w-80  
                    bg-white  transition-transform duration-300 ${
                        open ? "translate-x-0" : "translate-x-96"
                    } `}
                >
                    {children}
                </div>
                <div
                    className={`fixed top-0 left-0 z-10 h-screen w-screen 
                    bg-black transition-opacity  ease-in-out ${
                        open ? "opacity-50" : "  pointer-events-none opacity-0 "
                    }`}
                    onClick={onClose}
                ></div>
            </div>
        </>
    );
}
