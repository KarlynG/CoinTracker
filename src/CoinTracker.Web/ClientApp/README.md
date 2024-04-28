
# CoinTracker Frontend

## Features

- Single-page application (SPA) built with React and TypeScript.
- Uses Vite for build optimization and Hot Module Replacement (HMR).
- Implements state management with Zustand.
- Utilizes Mantine library for UI components.
- Integrated with Firebase for authentication.
- Responsive design compatible with various devices.
- Features interactive charts with Recharts and Mantine Charts.
- Applies form management with Formik and validation with Zod.

## Getting Started

### Prerequisites

- Node.js (latest stable version recommended)
- Yarn package manager
- Access to Firebase project for authentication setup

### Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/your-username/coin-tracker-fe.git
   ```

2. Navigate to the project directory:
   ```shell
   cd coin-tracker-fe
   ```

3. Install dependencies:
   ```shell
   yarn install
   ```

4. Configure environment variables:
   Copy `.env.example` to `.env` and fill in the details such as Firebase configuration keys.

5. Start the development server:
   ```shell
   yarn dev
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Building for Production

1. Build the static files:
   ```shell
   yarn build
   ```

2. Preview the production build:
   ```shell
   yarn preview
   ```

## Docker Deployment

1. Build the Docker image:
   ```docker
   docker-compose build
   ```

2. Run the Docker container:
   ```docker
   docker-compose up -d
   ```

   The frontend should now be accessible at [http://localhost:8080](http://localhost:8080).

## Usage

- Navigate through the app to track cryptocurrency transactions.
- Use the interactive charts to visualize spending.
- Manage and update your budget limits and transactions.

## Contributing

- If you wish to contribute to the project, please fork the repository and submit a pull request.
- For major changes, please open an issue first to discuss what you would like to change.

## License

- This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

- Project Link: [https://github.com/your-username/coin-tracker-fe](https://github.com/your-username/coin-tracker-fe)
