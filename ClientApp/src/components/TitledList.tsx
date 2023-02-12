import { Button } from "./ui";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface TitledListProps {
    title: string;
    children: React.ReactNode;
    setisOpen?: (value: boolean) => void;
    hasAddButton?: boolean;
}

export default function TitledList({ title, setisOpen, children }: TitledListProps) {
    return (
        <>
            <div className={`flex items-center justify-between w-full py-1`}>
                <h2 className="text-xl font-semibold">{title}</h2>
                {setisOpen && (
                    <Button padding="none" onClick={() => setisOpen(true)}>
                        <AddOutlinedIcon htmlColor="#2563eb" fontSize="large" />
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-3">{children}</div>
        </>
    );
}
