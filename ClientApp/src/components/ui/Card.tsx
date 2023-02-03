import { cva, VariantProps } from "class-variance-authority";

const cardStlyes = cva("bg-white rounded", {
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
        shadow: "shadow",
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
