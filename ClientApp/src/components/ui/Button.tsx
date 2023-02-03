import { cva, VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

const buttonStyles = cva("rounded", {
    variants: {
        color: {
            primary: " bg-teal-600 text-white hover:bg-teal-700",
            secondary: " bg-gray-600 text-white hover:bg-gray-700",
            none: "bg-transparent hover:bg-gray-100",
            danger: " bg-red-600 text-white hover:bg-red-700",
        },
        padding: {
            none: "p-0",
            normal: "p-2",
            small: "p-1",
        },
        fullWidth: {
            true: "w-full",
            false: "w-auto",
        },
    },
    defaultVariants: {
        color: "none",
        padding: "normal",
        fullWidth: false,
    },
});

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
    className?: string;
    onClick?: () => void;
    onMouseOver?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    to?: string;
    padding?: "none" | "small" | "normal";
}

function Button({
    color,
    onClick,
    type,
    children,
    to,
    padding,
    fullWidth,
    onMouseOver,
}: ButtonProps) {
    return to ? (
        <Link to={to}>
            <button
                className={buttonStyles({ color, padding, fullWidth })}
                onClick={onClick}
                type={type}
                onMouseOver={onMouseOver}
            >
                {children}
            </button>
        </Link>
    ) : (
        <button
            className={buttonStyles({ color, padding, fullWidth })}
            onClick={onClick}
            type={type}
            onMouseOver={onMouseOver}
        >
            {children}
        </button>
    );
}

export default Button;
