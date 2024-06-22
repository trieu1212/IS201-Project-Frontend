function timestampToDate(ts: number): Date {
    return new Date(ts);
}

function dateToString(date: Date, format: string = "HH:mm DD:MM:YYYY"): string {
    const pad = (n: number): string => n < 10 ? '0' + n : n.toString();
    return format
        .replace("YYYY", date.getFullYear().toString())
        .replace("MM", pad(date.getMonth() + 1))
        .replace("DD", pad(date.getDate()))
        .replace("HH", pad(date.getHours()))
        .replace("mm", pad(date.getMinutes()));
}

function stringToDate(dateString: string, format: string = "HH:mm DD:MM:YYYY"): Date {
    const parts = dateString.match(/(\d+)/g);
    if (!parts) throw new Error("Invalid date string");

    const formatParts = format.match(/(YYYY|MM|DD|HH|mm)/g);
    if (!formatParts) throw new Error("Invalid format string");

    const dateComponents: { [key: string]: number } = { YYYY: 0, MM: 0, DD: 0, HH: 0, mm: 0 };
    formatParts.forEach((part, index) => {
        dateComponents[part] = parseInt(parts[index], 10);
    });

    return new Date(dateComponents['YYYY'], dateComponents['MM'] - 1, dateComponents['DD'],
                    dateComponents['HH'], dateComponents['mm']);
}

export default function timestampToString(ts: number, format: string = "HH:mm DD:MM:YYYY"): string {
    const date = timestampToDate(ts);
    return dateToString(date, format);
}