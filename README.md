# CineQuest - Movie Tracking Application

A full-stack movie tracking application built with React (frontend) and Node.js/Express (backend).

## Features

- User authentication (register/login)
- Movie search and discovery
- Personal watchlist management
- Movie queue and watched list
- Responsive design

## Tech Stack

### Frontend
- React 19.1.0
- React Router DOM
- Axios for API calls
- CSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Create environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Fill in your MongoDB connection string and JWT secret

4. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the React development server (port 3000) and the Node.js server (port 5001).

## Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Git repository initialized
- MongoDB Atlas account (for cloud database)

### Deployment Steps

1. **Install Heroku CLI** (if not already installed):
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

4. **Set up MongoDB Atlas**:
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string

5. **Configure environment variables on Heroku**:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_connection_string"
   heroku config:set JWT_SECRET="your_jwt_secret_key"
   heroku config:set NODE_ENV="production"
   ```

6. **Deploy to Heroku**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

7. **Open your deployed app**:
   ```bash
   heroku open
   ```

### Environment Variables Required on Heroku

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key for JWT token generation
- `NODE_ENV`: Set to "production"
- `PORT`: Automatically set by Heroku

### Deployment Notes

- The app uses the `heroku-postbuild` script to automatically build the React app during deployment
- The server serves the React build files in production
- All API routes are prefixed with `/api`
- The client is configured to make requests to the same domain in production

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start both client and server in development mode
- `npm run server`: Start only the server
- `npm run client`: Start only the client
- `npm run build`: Build the React app for production

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user

### Watchlist
- `GET /api/watchlist`: Get user's watchlist
- `POST /api/watchlist/queue`: Add movie to queue
- `DELETE /api/watchlist/queue/:movieId`: Remove movie from queue
- `POST /api/watchlist/watched`: Add movie to watched list
- `DELETE /api/watchlist/watched/:movieId`: Remove movie from watched list

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
