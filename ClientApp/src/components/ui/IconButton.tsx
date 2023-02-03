import { cva, VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

const buttonStyles = cva("p-2 flex rounded", {
    variants: {
        color: {
            primary: " bg-teal-600 text-white hover:bg-teal-700",
            secondary: " bg-gray-600 text-white hover:bg-gray-700 ",
            none: "bg-transparent hover:bg-gray-100",
            danger: " bg-red-600 text-white hover:bg-red-700",
        },
    },
    defaultVariants: {
        color: "none",
    },
});

export interface IconButtonProps extends VariantProps<typeof buttonStyles> {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    to?: string;
}

export default function IconButton({
    color,
    onClick,
    type,
    children,
    to,
}: IconButtonProps) {
    return to ? (
        <Link to={to}>
            <button className={buttonStyles({ color })} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>
    ) : (
        <button className={buttonStyles({ color })} onClick={onClick} type={type}>
            {children}
        </button>
    );
}
