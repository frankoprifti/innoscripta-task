# innoscripta - news aggregator

The challenge is to create the user interface for a
news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.x recommended)
- Yarn (or npm)
- Docker
- Docker Compose

## Running the Application Locally

To run the application on your local machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/frankoprifti/innoscripta-task.git
   cd innoscripta-task
   ```

2. **Install Dependencies:**
   Install all the required dependencies using Yarn:

```bash
yarn install
```

3. **Set Up Environment Variables:**
   Create a .env file in the root directory and add your environment variables following the .env.example file. You can use the example env variables for testing purposes.

4. **Run the Development Server:**

```bash
yarn dev
```

The application should now be running at http://localhost:3000.

5. **Build and Start the Production Server:**
   If you want to test the production build locally:

```bash
yarn build
yarn start
```

This will run the application in production mode at http://localhost:3000.

## Running the Application with Docker

You can also run the application within a Docker container. Follow these steps:

First, navigate to the project directory and build the Docker image using Docker Compose:

1. **Build the docker image:**

```bash
docker-compose up --build
```

This will build the Docker image and start the containerized application.

2. **Access the Application:**
   Once the container is running, you can access the application at http://localhost:3000.
