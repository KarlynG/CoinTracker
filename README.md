# CoinTracker API

CoinTracker is an application which sole purpose is to keep track of your transactions and make it easier to build a saving plan around them.

[Demo](https://cointracker-cv4qoa4nrq-uc.a.run.app/)

## Features

- Built with C# .NET 8
- Follows Clean Architecture principles
- Uses PostgreSQL as the database
- Implements authorization using Firebase scheme
- Utilizes Hangfire for background jobs
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- .NET 8 SDK
- PostgreSQL
- Firebase account
- Docker (optional)

### Installation

1. Clone the repository:
```
git clone https://github.com/KarlynG/CoinTracker.git
```
2. Navigate to the project directory:

3. Configure the database connection string in `appsettings.json`:
```
"ConnectionStrings": {
  "DefaultConnection": "Your_PostgreSQL_Connection_String"
}
```
4. Set up Firebase authentication:

- Create a new Firebase project in the Firebase Console
- Enable the desired authentication methods (e.g., email/password, Google, etc.)
- Obtain the Firebase project credentials and configure them in the project

Firebase configuration can be found in the `appsettings.json`:
```
"Jwt": {
  "Firebase": {
    "ValidIssuer": "https://securetoken.google.com/your-project",
    "ValidAudience": "your-project"
  }
},
"FirebaseSdk": "your-project-sdk-location",
```

5. Run the database migrations:
   ```dotnet ef database update```

6. Start the application


## Docker Deployment
1. Build the Docker Image:
```docker
docker build -t your-image-name .
```
2. Run the docker container:
```docker
docker run -d -p 8080:80 your-image-name
```

The API should now be accessible at http://localhost:8080.
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

- Email: karlynl251@gmail.com
