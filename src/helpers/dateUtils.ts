export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function getMonthEndDate(date: Date): string {
    return formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function getNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function isDateInRange(date: string, startDate: string, endDate: string): boolean {
    const time = Date.parse(date);
    return time >= Date.parse(startDate) && time <= Date.parse(endDate);
}

export function generateTimestamp(): string {
    return new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
}
