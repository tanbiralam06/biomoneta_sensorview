# **App Name**: SensorView

## Core Features:

- Dashboard Header: Displays 'Environmental Sensor Data Dashboard' as the main title and '2nd Floor Chamber - Air Inlet' as the subtitle.
- Key Metrics Display: Shows current CO2, Temperature, Humidity, and PM 2.5 readings with units, updated with a 'Last Updated' timestamp.
- Interactive Charts: Presents interactive time-series charts for temperature, humidity, CO2 levels, particle matter levels, VOC, and NOx, sourced from dummy data.
- Dummy Data Generation: Generates realistic, aggregated 5-minute dummy data for the last 24 hours for the specific sensor, ending at the defined time, and covering specified columns (Date and Time, CO2, Temperature, Humidity, PM values, VOC, NOx).
- Bacteria Levels Chart: Displays a chart specifically highlighting bacteria levels over time, emphasizing critical thresholds or spikes.

## Style Guidelines:

- Primary color: A dark blue (#1A237E) to create a sophisticated and serious tone.
- Background color: A darker gray (#37474F) for a modern, easy-on-the-eyes dark theme.
- Accent color: A vibrant teal (#26A69A) to draw attention to key metrics and interactive elements, ensuring they stand out against the dark background.
- Body and headline font: 'Roboto', a grotesque-style sans-serif, providing a modern and neutral look for readability, optimized for dark themes.
- Use simple, clear, and monochromatic icons (white or light teal) representing each sensor type to aid quick identification, ensuring visibility on the dark background.
- Employs a clean, modern layout with clear separation between sections using Tailwind CSS for responsiveness. Card-like designs with subtle shadows to create depth.
- Subtle transitions on data updates or interactions to provide a smooth user experience. Loading animations that are non-intrusive and fit the dark theme aesthetic.