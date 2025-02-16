# Muwaqqit Prayer Times CSV Generator

This project retrieves prayer times using the Muwaqqit API and exports them to a CSV file. The script supports fetching prayer times for a specified date range and includes Hijri dates using the Aladhan API.

This tool is useful for individuals, mosques, and organizations that require structured and accurate prayer time data for their location. The script fetches monthly prayer time data based on a specified location and calculation method and then compiles it into a CSV file. This CSV file can be used for further analysis, integration into other systems, or simply as a reference for daily prayer times.

The application ensures accurate prayer times by utilizing the Muwaqqit API, which is based on precise astronomical calculations. Additionally, the script converts the Gregorian date to its corresponding Hijri date using the Aladhan API, making it suitable for Islamic calendar-based scheduling and religious observances.

The script includes built-in rate-limiting mechanisms to comply with API restrictions and prevent excessive requests. The output is structured in an easy-to-read format, making it accessible for both personal use and software applications that require programmatic access to prayer time data.

With configurable location and calculation parameters, this project offers flexibility in determining prayer times based on different settings, including elevation, refraction, and time zone adjustments.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Version 16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/muntaserq/muwaqqit-prayer-table.git
   cd muwaqqit-prayer-table
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration

The script requires configuration parameters for location and calculation settings. These are stored in `config.json`:

```json
{
    "lt": "41.878725",
    "ln": "-87.635797",
    "tz": "America/Chicago",
    "diptype": "apparent",
    "ea": -15.0,
    "eh": 211,
    "eo": 211,
    "fa": -18.0,
    "fea": 1.0,
    "ia": 4.5,
    "isn": -10.0,
    "k": 0.155,
    "t": 10.0,
    "rsa": 1.0,
    "vc": 3.53,
    "p": 1010.0
}
```

### Configuration Parameters:
- **lt** (Latitude): Geographic latitude of the location.
- **ln** (Longitude): Geographic longitude of the location.
- **tz** (Timezone): Time zone according to the TZ database where any special characters are escaped, e.g., "tz=Europe/London". The available time zones can be found in the [TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- **diptype**: Horizon dip type for Fajr and Isha calculations (e.g., "apparent").
- **ea**: Isha angle in degrees (e.g., -18.0).
- **eh**: Elevation of the horizon in meters.
- **eo**: Elevation of the observer in meters.
- **fa**: Fajr angle in degrees (e.g., -18.0).
- **fea**: Fajr/Isha uncertainty in degrees.
- **ia**: Karāhah angle in degrees.
- **isn**: Ishtibāk al‑Nujūm angle in degrees.
- **k**: Refraction coefficient.
- **t**: Temperature at the observer’s location in Celsius.
- **rsa**: Sun rise/set uncertainty in degrees.
- **vc**: Hilāl sighting model coefficient (e.g., 3.53 for naked-eye difficult sighting).
- **p**: Atmospheric pressure in mb.

Modify these values according to your specific location and calculation preferences before running the script.

## Usage

To run the script and generate prayer times for a specified date range, use the following command:

```sh
node index.js
```

By default, the script is set to generate prayer times for:

```js
const startDate = "2025-02-17";
const endDate = "2025-03-31";
```

You can modify these values in `index.ts` before running the script.

## Output

The script generates a CSV file named `prayer_times_YYYYMMDDHHMMSS.csv` with the following format:

```
Date,Hijri Date,Fajr,Sunrise,Duhur,Asr,Asr (Hanafi),Maghrib,Isha
2025-02-17,Rabi al-Thani 6 1446,05:45,07:10,12:30,15:45,16:30,18:20,19:30
...
```

### CSV Headers Explanation:
- **Date**: The Gregorian date for the prayer times.
- **Hijri Date**: The corresponding Hijri (Islamic calendar) date.
- **Fajr**: The time for the Fajr (pre-dawn) prayer.
- **Sunrise**: The time of sunrise.
- **Duhur**: The time for the Duhur (noon) prayer.
- **Asr**: The time for the Asr prayer according to the standard opinion.
- **Asr (Hanafi)**: The time for the Asr prayer according to the Hanafi school of thought.
- **Maghrib**: The time for the Maghrib (sunset) prayer.
- **Isha**: The time for the Isha (night) prayer.

The CSV file will be saved in the project directory and can be opened using any spreadsheet software.

## API Information

- **Muwaqqit API**: Provides prayer times and astronomical data. More info at [https://api.muwaqqit.com](https://api.muwaqqit.com).
- **Aladhan API**: Converts Gregorian dates to Hijri dates. More info at [https://aladhan.com](https://aladhan.com/api).

## Troubleshooting

- **Rate Limits**: The Muwaqqit API has a rate limit of 250 requests per 30 seconds. The script includes delays to avoid exceeding this limit.
- **Invalid API Response**: If the API response is missing data, verify that the configured location and timezone are correct.
- **Permission Issues**: Ensure you have write access to the directory where the CSV file is generated.

## License

This project is licensed under the [Creative Commons Attribution License](https://creativecommons.org/licenses/by/4.0/). The Muwaqqit API requires attribution for derivative works.

## Contributing

If you’d like to contribute, fork the repository and submit a pull request with your changes.

## Contact

For support or questions, open an issue on GitHub or contact muntaserq.