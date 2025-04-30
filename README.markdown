# Joseph Onyango Portfolio Website

## Overview

This is a personal portfolio website for Joseph Onyango, a software engineer and web developer. The website showcases Joseph's skills, projects, services, and contact information, along with a collection of interactive tools. It features a modern, responsive design with visual effects like a snowflake mouse trail and floating particles to enhance the user experience.

## Features

- **Responsive Design**: The website adapts seamlessly to different screen sizes, ensuring a great experience on both desktop and mobile devices.
- **Snowflake Mouse Trail**: A dynamic visual effect where snowflakes follow the cursor, adding an interactive element to the site.
- **Floating Particles Effect**: Glowing particles float across all pages, creating a mesmerizing background effect.
- **Interactive Tools**: A collection of useful tools including a scientific calculator, weather app (mock), to-do list, currency converter, timer/stopwatch, unit converter, random number generator, color picker, and BMI calculator.
- **Multilingual Support**: Language selection dropdown to switch between English, Spanish, and French (translations handled via `translations.js`).
- **Modern Styling**: Gradient backgrounds, hover effects, and animations for an engaging user experience.
- **Sections**:
  - Home: Introduction with a hero section and gallery.
  - About: Personal background and journey timeline.
  - Services: Web development, UI/UX design, and consulting services with testimonials.
  - Skills: Technical skills with descriptive cards.
  - Projects: Showcase of major projects with images.
  - Tools: Interactive utility tools for users.
  - Contact: Contact information and social media links.

## File Structure

- **index.html**: Homepage with hero section, intro, and gallery.
- **about.html**: About section with personal info and journey timeline.
- **services.html**: Services offered and testimonials.
- **skills.html**: Skills showcase.
- **projects.html**: Project portfolio.
- **tools.html**: Interactive tools page.
- **contact.html**: Contact information and social links.
- **styles.css**: Main stylesheet for styling and animations (snowflakes, particles, etc.).
- **script.js**: JavaScript for interactive features (snowflake trail, custom cursor, tools functionality).
- **translations.js**: Handles language translations (not provided in this repo; must be implemented separately).
- **tools.py**: Python script for a CLI version of the tools (not used in the web version).

## Setup Instructions

1. **Clone or Download the Repository**:
   - Clone the repo or download the files to your local machine.
   - Example: `git clone <repository-url>`

2. **Serve the Website**:
   - Since this is a static website, you can open `index.html` directly in a browser, but it’s recommended to use a local server for proper functionality.
   - Use a local server like `Live Server` in VS Code, or run a simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Open your browser and navigate to `http://localhost:8000`.

3. **Dependencies**:
   - The website uses Font Awesome for icons, loaded via CDN:
     ```html
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
     ```
   - Ensure an internet connection for the CDN to load, or host Font Awesome locally.

4. **Language Translations**:
   - The `translations.js` file is referenced but not provided. You need to create this file and define the `applyTranslations` function to handle language switching. Example structure:
     ```javascript
     function applyTranslations(lang) {
         // Translation logic here
     }
     ```

## Usage

- **Navigation**: Use the top navigation bar to switch between pages (Home, About, Services, Skills, Projects, Tools, Contact).
- **Language Selection**: Use the dropdown in the navigation bar to switch languages (requires `translations.js` implementation).
- **Snowflake Trail and Particles**:
  - Move your mouse across any page to see the snowflake trail effect.
  - Floating particles are visible on all pages as a background effect.
- **Tools**:
  - Navigate to the Tools page (`tools.html`) to access the interactive tools.
  - Each tool has its own section with inputs and buttons for interaction (e.g., enter a city in the Weather App, add tasks in the To-Do List, etc.).

## Tools Details

- **Scientific Calculator**: Perform basic arithmetic and scientific operations (sin, cos, tan, log, sqrt, power).
- **Weather App**: Displays mock weather data for a given city (e.g., "Weather in Nairobi: 25°C, Sunny").
- **To-Do List**: Add and delete tasks dynamically.
- **Currency Converter**: Convert between USD, EUR, KES, and GBP using mock exchange rates.
- **Timer/Stopwatch**: Includes a stopwatch (start, stop, reset) and countdown timer.
- **Unit Converter**: Convert between length (meters, kilometers, miles, feet), weight (kilograms, pounds, ounces), and temperature (Celsius, Fahrenheit, Kelvin).
- **Random Number Generator**: Generate a random number within a specified range.
- **Color Picker**: Pick a color and see its HEX and RGB values, with a live preview.
- **BMI Calculator**: Calculate BMI based on weight (kg) and height (cm), with category classification.

## Known Issues

- **Language Translations**: The `translations.js` file is not implemented. Without it, the language dropdown will throw an error when changed.
- **Weather App**: Currently uses mock data. To fetch real weather data, integrate with a weather API (e.g., OpenWeatherMap) in `script.js`.
- **External Dependencies**: Relies on Font Awesome CDN. If offline, the icons will not load.

## Future Improvements

- Implement real weather data fetching in the Weather App using an API.
- Add form submission functionality to the Contact page (currently static).
- Enhance the particles effect with more customization (e.g., adjustable speed, colors).
- Add more tools or improve existing ones (e.g., save to-do list items to local storage).

## License

© 2025 Joseph Onyango. All rights reserved.