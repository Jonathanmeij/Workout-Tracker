import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from "recharts";

export default function Chart({ data }: { data: any[] }) {
    console.log(data);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
