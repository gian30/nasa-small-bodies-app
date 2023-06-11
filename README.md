# NASA Small Bodies App

This is a project consisting of a backend API and a frontend application for the NASA Small Bodies or Asteroids. The backend API provides data about small bodies in space, and the frontend application allows users to search and view information about these small bodies.

## Prerequisites

Before running the project, make sure you have the following dependencies installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (if you want to run the project using Docker)

## Getting Started

To run the project locally, follow these steps:

### Backend API

1. Open a terminal and navigate to the `backend` directory.
   ```
   cd backend
   ```

2. Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```
   API_KEY=PUT_YOUR_API_KEY_HERE
   WHITELIST_URLS=http://localhost:3000
   SERVER_PORT=4000
   ```

   Replace `PUT_YOUR_API_KEY_HERE` with your NASA API key.

3. Install the dependencies by running the following command:
   ```
   npm install
   ```

4. Start the backend API server:
   ```
   npm start
   ```

   The API will be available at `http://localhost:4000/api`.

### Frontend Application

1. Open a new terminal and navigate to the `frontend` directory.
   ```
   cd frontend
   ```

2. Create a `.env` file in the `frontend` directory and configure the following environment variable:

   ```
   REACT_APP_API_BASE_URL=http://localhost:4000/api
   ```

3. Install the dependencies by running the following command:
   ```
   npm install
   ```

4. Start the frontend application:
   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Running with Docker

To run the project using Docker, make sure you have Docker installed on your machine.

1. Open a terminal and navigate to the project root directory (where the `docker-compose.yml` file is located).

2. Modify the `docker-compose.yml` file and replace the placeholder `PUT_YOUR_API_KEY_HERE` with your NASA API key.

3. Run the following command to start the Docker containers:
   ```
   docker-compose up
   ```

   This will build and start the backend API and frontend application in separate containers.

   - The backend API will be available at `http://localhost:4000/api`.
   - The frontend application will be available at `http://localhost:3000`.

4. To stop the Docker containers, run the following command in the same directory:
   ```
   docker-compose down
   ```

## Scripts

In the project root directory, you'll find the following scripts:

- `compose-services-up.sh`: Shell script to start the Docker containers.
- `compose-services-down.sh`: Shell script to stop the Docker containers.

You can run these scripts to quickly start or stop the Docker containers instead of typing the `docker-compose` commands manually.
