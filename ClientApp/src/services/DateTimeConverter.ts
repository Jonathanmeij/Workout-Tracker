const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export function dateToString(dateTime: string) {
    //from: 2023-02-12T14:57:18.158296
    //to: 12 Feb 2023
    const day = dateTime.split("T")[0].split("-")[2];
    const month = months[parseInt(dateTime.split("T")[0].split("-")[1]) - 1];
    const year = dateTime.split("T")[0].split("-")[0];
    return `${day} ${month} ${year}`;
}
