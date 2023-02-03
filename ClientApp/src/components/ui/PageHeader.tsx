interface PageHeaderProps {
    children: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
    return <div className="w-screen h-[500px] overflow-hidden">{children}</div>;
}
