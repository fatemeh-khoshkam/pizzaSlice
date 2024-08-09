export function calcMinutesLeft(dateStr: string) {
    const d1: number = new Date().getTime();
    const d2: number = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
}