export const formatDate = (date: string | number | Date): string => {
    if (date instanceof Date) {
        const paddedDay = String(date.getDate()).padStart(2, "0");
        const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${paddedDay}/${paddedMonth}/${year}`;
    }

    const newDate = new Date(date);
    return formatDate(newDate);
};
export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
