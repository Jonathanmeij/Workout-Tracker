interface TextInputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    required?: boolean;
    icon?: React.ReactNode;
}

export default function TextInput({
    className,
    onChange,
    value,
    placeholder,
    type,
    name,
    required,
    icon,
}: TextInputProps) {
    return (
        <div className={`relative ${className}`}>
            {icon && (
                <div className=" absolute top-1/2 left-2 -translate-y-1/2">{icon}</div>
            )}
            <input
                className={`${
                    icon ? "pl-10" : ""
                } rounded bg-gray-100 p-2 ring-0 focus:outline-none focus:ring-2 focus:ring-teal-600`}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
                name={name}
                required={required}
            />
        </div>
    );
}
