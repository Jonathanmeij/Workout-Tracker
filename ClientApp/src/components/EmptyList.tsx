import { Button } from "./ui";

interface EmptyListProps {
    setIsOpen?: (isOpen: boolean) => void;
    item: string;
}

export default function EmptyList({ setIsOpen, item }: EmptyListProps) {
    return (
        <div className="flex items-center justify-center w-full h-96">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-lg font-semibold text-gray-400 text-1xl">
                    no {item}s found
                </h2>
                {setIsOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="text-blue-400 hover:text-blue-500"
                    >
                        Add {item}
                    </Button>
                )}
            </div>
        </div>
    );
}
