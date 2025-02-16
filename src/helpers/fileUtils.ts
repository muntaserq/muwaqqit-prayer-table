import * as fs from 'fs/promises';
import { isDateInRange } from './dateUtils';
import { logInfo, logError } from '../utils/logger';

export async function generateCsv(filename: string, data: any[], startDate: string, endDate: string): Promise<void> {
    try {
        logInfo(`Filtering data for CSV from ${startDate} to ${endDate}`);
        const filteredResults = data.filter(item => isDateInRange(item.date, startDate, endDate));

        logInfo(`Total records included in CSV: ${filteredResults.length}`);

        const csvData = [
            ["Date", "Hijri Date", "Fajr", "Sunrise", "Duhur", "Asr", "Asr (Hanafi)", "Maghrib", "Isha"],
            ...filteredResults.map(item => [
                item.date,
                item.hijri_date,
                item.fajr_time,
                item.sunrise_time,
                item.duhur_time,
                item.asr_time,
                item.asr_hanafi_time,
                item.maghreb_time,
                item.isha_time
            ])
        ].map(row => row.join(',')).join("\n");

        await fs.writeFile(filename, csvData);
        logInfo(`CSV file saved: ${filename}`);
    } catch (error) {
        logError("Error writing CSV file:", error);
    }
}
