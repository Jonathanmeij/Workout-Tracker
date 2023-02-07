import { cva, VariantProps } from "class-variance-authority";

const cardStlyes = cva("  rounded border-gray-700 border-1", {
    variants: {
        shadow: {
            none: "",
            shadow: "shadow-md shadow-slate-400 ",
        },
        rounded: {
            none: "",
            rounded: "rounded",
            roundedLg: "rounded-lg",
        },
        color: {
            none: "",
            gray: "bg-gray-800",
            darkGray: "bg-gray-900",
        },
    },
    defaultVariants: {
        shadow: "none",
        rounded: "rounded",
        color: "gray",
    },
});

interface CardProps extends VariantProps<typeof cardStlyes> {
    children: React.ReactNode;
    className?: string;
}

export function Card(props: CardProps) {
    const { children, className, shadow, rounded, color } = props;

    return (
        <div
            className={` overflow-hidden ${className} ${cardStlyes({
                shadow,
                rounded,
                color,
            })} `}
        >
            {children}
        </div>
    );
}
