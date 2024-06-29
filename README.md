# Task Manager

<img width="1510" alt="screenshot-1" src="https://github.com/d-stoianov/task-manager/assets/29949314/d7ad25b7-570f-4fa7-a833-9d345c089cc1">
<img width="1510" alt="screenshot-2" src="https://github.com/d-stoianov/task-manager/assets/29949314/29406d7c-6885-4e64-8a4b-e480bcee716e">
<img width="1510" alt="screenshot-2" src="https://github.com/d-stoianov/task-manager/assets/29949314/09785003-9075-40c3-88b5-0e9ffb1e5a99">

This project is a React application for task management. The app uses Firebase as a backend for saving data in a database and authorization.

The app is deployed [here](https://task-manager-beta-rouge.vercel.app)

## Tech Stack

-   **Vite**
-   **React**
-   **JavaScript**
-   **Tailwind CSS**
-   **React Router DOM**
-   **Firebase**

## Getting Started

### Prerequisites

-   Node.js
-   npm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/d-stoianov/task-manager.git
    cd task-manager
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Setup .env file:

    Create file in the root of the project called `.env`, with the following content:
    `VITE_API_KEY={apiKey}`
    `VITE_AUTH_DOMAIN={authDomain}`
    `VITE_PROJECT_ID={projectId}`
    `VITE_STORAGE_BUCKET={storageBucket}`
    `VITE_MESSAGING_SENDER_ID={messagingSenderId}`
    `VITE_APP_ID={appId}`
    `VITE_MEASUREMENT_ID={measurementId}`

    _To get your keys for the .env [Firebase console](https://console.firebase.google.com) create a new project and go to settings_

4.  Start the development server:

    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## Project Structure

-   `src/`: Contains all the source code
    -   `api/`: Api folder which contains Firebase API integration
    -   `assets/`: Contains all the assets css/images
    -   `components/`: General components
    -   `config/`: Folder with firebase config file
    -   `routes/`: Components for routes

## ESLint

The project uses ESLint and Prettier for code quality and consistency. You can run the linter with:

```bash
npm run lint
```

## Story

The app was a university semester assignment and was completed within a month.
