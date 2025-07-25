// app/api/sensor-data/route.ts

import { NextResponse } from 'next/server';

// NEW: A specific and reliable mapping from Sheet columns to JS keys
const keyMap: { [key: string]: string } = {
  "Date and Time": "time",
  "CO2": "co2",
  "Temperature": "temperature",
  "Humidity": "humidity",
  "PM 1.0": "pm1",
  "PM 2.5": "pm25",
  "PM 4.0": "pm40",
  "PM 10": "pm10",
  "VOC": "voc",
  "NOx": "nox"
};

export async function GET() {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json({ error: 'Google Script URL is not configured.' }, { status: 500 });
  }

  try {
    const response = await fetch(scriptUrl, {
        cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request to Google Script failed with status ${response.status}`);
    }

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message || 'An error occurred in the Google Script.');
    }

    // UPDATED: Use the reliable keyMap to transform data into the SensorDataPoint format
    const transformedData = result.data.map((row: any) => {
      const newRow: { [key: string]: any } = {};
      
      for (const key in row) {
        // Find the new key from our map, or ignore the key if it's not in the map
        const newKey = keyMap[key];
        if (newKey) {
          const value = parseFloat(row[key]);
          newRow[newKey] = isNaN(value) ? 0 : value;
        }
      }
      
      // Add the default bacteria value required by the frontend components
      newRow.bacteria = 0;

      return newRow;
    });

    return NextResponse.json(transformedData);

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
