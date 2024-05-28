# My To-Do App

This project is a simple To-Do application using a microservices architecture. It consists of three main components:

1. **Frontend**: Built with React, served by an Nginx server.
2. **Backend**: Built with Node.js and Express, handles API requests.
3. **Database**: MongoDB, stores the to-do items.

## Project Structure

```
my-todo-app/
├── .env
├── .gitignore
├── README.md
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── mongo-data/
```

## Prerequisites

- Docker
- Docker Compose

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/rohansadhawni/docker-compose-microservices-todo.git
cd my-todo-app
```

### 2. Create a `.env` File

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
# .env

# MongoDB URL
MONGODB_URL=mongodb://mongodb:27017/mydatabase

# Frontend port
FRONTEND_PORT=3000

# Backend port
BACKEND_PORT=5000
```

### 3. Build and Run the Application

Use Docker Compose to build and run the application:

```sh
docker-compose up -d --build
```

This will start the frontend, backend, and MongoDB services in detached mode.

## Accessing the Application

- **Frontend**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
- **Backend**: The backend API can be accessed at [http://localhost:5000](http://localhost:5000)

## Stopping the Application

To stop and remove all running containers, networks, and volumes:

```sh
docker-compose down
```

## Project Details

### Frontend

- **Location**: `frontend/`
- **Technology**: React
- **Dockerfile**:

  ```dockerfile
  FROM node:14-alpine AS build
  WORKDIR /app
  COPY package.json ./
  RUN npm install
  COPY . .
  RUN npm run build

  FROM nginx:alpine
  COPY --from=build /app/build /usr/share/nginx/html
  ```

### Backend

- **Location**: `backend/`
- **Technology**: Node.js, Express
- **Dockerfile**:

  ```dockerfile
  FROM node:14-alpine
  WORKDIR /app
  COPY package.json ./
  RUN npm install
  COPY . .
  EXPOSE 5000
  CMD ["node", "src/index.js"]
  ```

### MongoDB

- **Image**: `mongo:latest`
- **Data Volume**: `mongo-data:/data/db`

## Environment Variables

The application uses the following environment variables, which should be defined in a `.env` file:

- `MONGODB_URL`: MongoDB connection URL
- `FRONTEND_PORT`: Port on which the frontend service will run
- `BACKEND_PORT`: Port on which the backend service will run

## Contributions

Feel free to fork this project and submit pull requests. Any improvements or suggestions are welcome.

## License

This project is licensed under the MIT License.
