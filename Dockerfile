# Use the .NET 8 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the Directory.Build.props and Directory.Packages.props files
COPY Directory.Build.props ./
COPY Directory.Packages.props ./

# Copy the solution file and project files, and restore dependencies
COPY CoinTracker.sln .
COPY src/CoinTracker.Web/CoinTracker.Web.csproj ./src/CoinTracker.Web/
COPY src/CoinTracker.Core/CoinTracker.Core.csproj ./src/CoinTracker.Core/
COPY src/CoinTracker.Infrastructure/CoinTracker.Infrastructure.csproj ./src/CoinTracker.Infrastructure/
COPY src/CoinTracker.UseCases/CoinTracker.UseCases.csproj ./src/CoinTracker.UseCases/
RUN dotnet restore

# Copy the remaining files and build the application
COPY . .
RUN dotnet publish ./src/CoinTracker.Web -c Release -o /app

# Use the .NET 8 runtime image as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app .

# Expose the appropriate port if necessary
EXPOSE 80
EXPOSE 443

# Set the entry point for the API
ENTRYPOINT ["dotnet", "CoinTracker.Web.dll"]