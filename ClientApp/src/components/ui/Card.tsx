import { cva, VariantProps } from "class-variance-authority";

const cardStlyes = cva(" bg-gray-800 rounded border-gray-700 border-1", {
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
    },
    defaultVariants: {
        shadow: "none",
    },
});

interface CardProps extends VariantProps<typeof cardStlyes> {
    children: React.ReactNode;
    className?: string;
}

export function Card(props: CardProps) {
    const { children, className, shadow, rounded } = props;

    return (
        <div
            className={` overflow-hidden ${className} ${cardStlyes({
                shadow,
                rounded,
            })} `}
        >
            {children}
        </div>
    );
}
