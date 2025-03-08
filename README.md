# Ctruth - Health and Wellness Management System

## Description

Ctruth is a Health and Wellness Management System designed to help users manage their medications efficiently. It provides functionalities for medication tracking, recurring reminders, report generation, email notifications, and secure authentication.

## Features

-   **User Authentication**: Secure login and registration with JWT-based authentication.
-   **Medication Management**: Add, update, and track medications.
-   **Recurring Medication Reminders**: Set daily or weekly reminders.
-   **Automated Email Notifications**: Receive medication reminders via email.
-   **Report Generation**: Weekly reports on medication history in CSV format.
-   **Queue-Based Processing**: Background jobs using BullMQ to handle report generation and email notifications.
-   **Secure File Storage**: Cloudinary integration for storing report files.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/abdulrehan1729/Health-management-system.git
    cd ctruth
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and configure the following:
        ```env
        PORT=3000
        MONGO_URI=<your-mongodb-uri>
        JWT_SECRET=<your-secret-key>
        SMTP_HOST=<your-smtp-host>
        SMTP_PORT=<your-smtp-port>
        SMTP_USER=<your-email>
        SMTP_PASS=<your-app-password>
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
        ```

## Usage

1. Start the application:
    ```sh
    npm start
    ```
    This will:
    - Start the Express.js server
    - Run cron jobs for medication reminders and report scheduling
    - Initialize BullMQ workers for handling background tasks

## API Endpoints

### Authentication

-   **POST** `/api/v1/auth/register` - Register a new user
-   **POST** `/api/v1/auth/login` - User login
-   **POST** `/api/v1/auth/logout` - Logout from the system
-   **POST** `/api/v1/auth/logout-all` - Logout from all devices
-   **POST** `/apiv1//auth/logout-others` - Logout from all the other devices

### Medication Management

-   **POST** `/api/v1/medication` - Add new medication
-   **GET** `/api/v1/medication` - Get user medications
-   **PUT** `/api/v1/medication/mark-done/:id` - Mark medication as done
-   **DELETE** `/api/v1/medication/:id` - Remove a medication

## Technologies Used

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Mongoose ORM)
-   **Authentication**: JWT (JSON Web Token)
-   **Task Scheduling**: Node-Cron
-   **Queues**: BullMQ
-   **File Storage**: Cloudinary
-   **Logging**: Winston



