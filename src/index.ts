import { Response, Entry } from './models/response';
import { Output } from './models/output';
import config from '../config.json';
import { hijriMonthFixes } from './helpers/hijriMonthFixes';
import { formatDate, getMonthEndDate, getNextMonth, generateTimestamp, isDateInRange } from './helpers/dateUtils';
import { buildApiUrl, delay } from './helpers/apiUtils';
import { generateCsv } from './helpers/fileUtils';
import { logInfo, logError } from './utils/logger';

const API_BASE_URL = "https://api.muwaqqit.com/api.json";
const ALADHAN_API_BASE_URL = "https://api.aladhan.com/v1/gToH";
const REQUEST_DELAY = 15000;
const HIJRI_API_DELAY = 500;
const params = { ...config };

type PrayerTimeEntry = Output & { hijri_date: string };
let results: PrayerTimeEntry[] = [];

async function generatePrayerTimeTable(startDate: string, endDate: string): Promise<void> {
    try {
        logInfo(`Starting prayer time generation from ${startDate} to ${endDate}`);
        
        let currentDate = new Date(startDate);
        const finalDate = new Date(endDate);

        while (currentDate <= finalDate) {
            const monthStart = formatDate(currentDate);
            const monthEnd = getMonthEndDate(currentDate);

            logInfo(`Fetching prayer times for ${monthStart} - ${monthEnd}`);

            await getMonthData(monthStart, monthEnd);
            await delay(REQUEST_DELAY);

            currentDate = getNextMonth(currentDate);
        }

        logInfo("Prayer times fetched successfully. Generating CSV...");
        await generateCsv(`prayer_times_${generateTimestamp()}.csv`, results, startDate, endDate);
        logInfo("CSV generation completed successfully.");
    } catch (error) {
        logError("Error in prayer time generation:", error);
    }
}

async function getMonthData(startDate: string, endDate: string): Promise<void> {
    try {
        const uri = buildApiUrl(API_BASE_URL, Object.fromEntries(
            Object.entries({ ...params, d: startDate }).map(([key, value]) => [key, String(value)])
        ));

        const response = await fetch(uri);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

        const data: Response = await response.json();
        for (const entry of data.list) {
            if (!isDateInRange(entry.fajr_date, startDate, endDate)) continue;

            logInfo(`Processing date: ${entry.fajr_date}`);
            const hijriDate = await getHijriDate(entry.fajr_date);
            results.push({ ...mapEntryToOutput(entry), hijri_date: hijriDate });
        }
    } catch (error) {
        logError(`Error fetching data for ${startDate}:`, error);
    }
}

async function getHijriDate(gregorianDate: string): Promise<string> {
    try {
        await delay(HIJRI_API_DELAY);

        const formattedDate = formatDate(new Date(gregorianDate)).split('-').reverse().join('-');
        const uri = `${ALADHAN_API_BASE_URL}?date=${formattedDate}`;

        const response = await fetch(uri);
        if (!response.ok) throw new Error(`Aladhan API request failed with status ${response.status}`);

        const data = await response.json();
        let hijriMonth = hijriMonthFixes[data.data.hijri.month.en] || data.data.hijri.month.en;

        return `${hijriMonth} ${data.data.hijri.day} ${data.data.hijri.year}`;
    } catch (error) {
        logError(`Error fetching Hijri date for ${gregorianDate}:`, error);
        return "N/A";
    }
}

function mapEntryToOutput(entry: Entry): Output {
    return {
        date: entry.fajr_date,
        fajr_time: entry.fajr_time,
        sunrise_time: entry.sunrise_time,
        duhur_time: entry.zohr_time,
        asr_time: entry.mithl_time,
        asr_hanafi_time: entry.mithlain_time,
        maghreb_time: entry.sunset_time,
        isha_time: entry.esha_time,
    };
}

/**
 * Execution
 */
const startDate = "2025-02-17";
const endDate = "2025-03-31";
generatePrayerTimeTable(startDate, endDate);
