import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Box from "./Box";
import { Card } from "./Card";
import Divider from "./Divider";

type menuItem = {
    label: string;
    path: string;
};

interface PopperProps {
    children: React.ReactNode;
    buttonContent: React.ReactNode;
}

export function Popper({ children, buttonContent }: PopperProps) {
    return (
        <div className="relative z-30">
            <Menu>
                <Menu.Button className={`rounded p-2 hover:bg-gray-100`}>
                    {buttonContent}
                </Menu.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items>
                        <Card className="absolute right-0">
                            <div className="flex flex-col">{children}</div>
                        </Card>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

interface PopperMenuItemProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export function PopperMenuItem({ label, path, icon, onClick }: PopperMenuItemProps) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    to={path}
                    className={`min-w-[100px] rounded p-2 text-black ${
                        active ? "bg-gray-100" : "bg-white"
                    }`}
                    onClick={onClick}
                >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                </Link>
            )}
        </Menu.Item>
    );
}

export function PopperMenuItems({ menuItems }: { menuItems: menuItem[] }) {
    return (
        <Box className="flex flex-col py-2">
            {menuItems.map((item) => (
                <PopperMenuItem key={item.label} label={item.label} path={item.path} />
            ))}
        </Box>
    );
}

export function PopperHeader({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Box>{children}</Box>
            <Divider />
        </>
    );
}

export function PopperFooter({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Divider />
            <Box className="flex flex-col py-2">{children}</Box>
        </>
    );
}
