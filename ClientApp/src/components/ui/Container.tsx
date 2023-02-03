interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return <div className={` max-w-8xl px-2 mx-auto ${className}`}>{children}</div>;
}
