# WorldDataApp (React Native + REST Countries API)

## Overview

A mobile app built with React Native that allows users to search and view information about countries by fetching data from the RestCountries API. Users can input the name of a country to retrieve its details, such as its capital, language, currency, population, and more. The app also features a button to show a random country, providing an easy way to explore country information.

## Features

- Input field to search for a country by name.
- Displays country details such as name, capital, language, currency, population, and more.
- View a country’s flag.
- Show a random country and its details.
- Interactive links to view country locations on Google Maps and learn more via Wikipedia.
- Loader while fetching data from the API.

## Tech Stack

- **Frontend**:
  - **React Native** for mobile app development.
  - **React** hooks (`useState`) for managing component state.
  - **FlatList** for rendering a scrollable list of country details.
  - **ActivityIndicator** to show loading state during data fetch.

- **API**:
  - **RestCountries API**: Provides information about countries including details like name, capital, population, languages, currency, and flags. (Reference: https://restcountries.com/)

## UI Overview
![WhatsApp Image 2025-02-05 at 20 58 57](https://github.com/user-attachments/assets/805806db-8819-4523-9cdb-25e70423fb9c)

## Installation

To get started with this app, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/danilonakai/worlddata_reactnative.git
    cd worlddata_reactnative
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app on your device or emulator:
    ```bash
    npm start
    ```

The app should now be running on your device or emulator.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
