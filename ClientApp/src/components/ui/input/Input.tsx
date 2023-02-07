interface InputProps {
    className?: string;
    placeholder?: string;
    name: string;
    error?: string;
    type?: string;
    register: any;
    options?: any;
    fullWidth?: boolean;
}

export function Input({
    className,
    placeholder,
    error,
    type,
    register,
    name,
    options,
    fullWidth,
}: InputProps) {
    return (
        <div className="w-full ">
            <label className="text-sm text-gray-400">{placeholder}</label>
            <input
                type={type}
                {...register(name, {
                    ...options,
                })}
                placeholder={placeholder}
                className={`p-2 text-white border-1 border-gray-600 bg-gray-700 rounded ring-0 focus:outline-none focus:ring-2 focus:ring-blue-600 ${className} ${
                    fullWidth ? "w-full" : ""
                }
                ${error ? "border-red-400" : ""}
                `}
            />
            {error && <span className="text-sm text-red-400 ">{error}</span>}
        </div>
    );
}