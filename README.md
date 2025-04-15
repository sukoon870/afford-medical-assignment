# Social Media Analytics Platform

A full-stack application that provides real-time analytical insights for social media data. This project consists of a backend API service that processes data from a social media platform's test server and a frontend web application that visualizes the analytics in an intuitive, responsive interface.

## Project Overview

This project delivers a complete solution for monitoring and analyzing social media engagement metrics:

- **Backend API**: A Node.js/Express microservice that fetches, processes, and caches data from the social media test server
- **Frontend Dashboard**: A React application with Tailwind CSS that visualizes the analytics data with a clean, responsive interface
- **Real-time Updates**: Automatic data refreshing provides up-to-date insights without manual intervention

## Project Structure

```
project/
├── question_1/               # Backend API service
│   ├── src/
│   │   ├── index.ts          # Express server with analytics endpoints
│   │   ├── test-server-utils.ts # Test server communication utilities
│   │   ├── env.ts            # Environment configuration
│   │   └── types.ts          # Type definitions
│   ├── auth.json.example     # Example authentication configuration
│   ├── .env.example          # Example environment variables
│   └── ...
│
└── question_2/               # Frontend React application
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Application pages
    │   ├── services/         # API communication services
    │   ├── utils/            # Utility functions
    │   ├── types.ts          # Type definitions
    │   ├── App.tsx           # Main application component
    │   └── ...
    └── ...
```

## Features

### Backend (API Service)

- **Secure Authentication**: Automated token management with automatic renewal
- **Efficient Data Processing**: In-memory caching reduces load on the test server
- **Analytics Endpoints**:
  - `/users`: Top five users with the most commented posts
  - `/posts?type=popular`: Posts with the maximum number of comments
  - `/posts?type=latest`: Most recent posts in real-time

### Frontend (React Application)

- **Three Main Views**:
  - **Top Users**: Shows the most active users ranked by comment count
  - **Trending Posts**: Displays the most popular posts by comment engagement
  - **Live Feed**: Real-time stream of the latest posts with auto-refresh
- **Responsive Design**: Clean UI that works across devices of all sizes
- **Real-time Updates**: SWR data fetching with auto-revalidation
- **Visual Appeal**: Random avatars and images enhance the user experience

## Technologies Used

### Backend

- **Node.js & Express**: For the API server
- **TypeScript**: For type safety and better code organization
- **Axios**: For HTTP requests to the test server
- **Token-based Authentication**: For secure API access

### Frontend

- **React**: Component-based UI library
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling and responsive design
- **React Router**: For navigation
- **SWR**: For data fetching, caching, and revalidation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd question_1
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Copy the example configuration files:

   ```
   cp .env.example .env
   cp auth.json.example auth.json
   ```

4. Update the configuration files with your credentials

5. Start the server:

   ```
   npm start
   ```

The API server will start on the port specified in your `.env` file (default: 3000).

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd question_2
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

The React application will start on port 3001, connecting to the backend API at <http://localhost:3000>.

## Key Implementation Details

### Backend

#### Token Management

- Static `TokenManager` class handles authentication tokens
- Tokens are automatically renewed 10 minutes before expiration
- Persistent token storage with `.token-cache.json`

#### Data Caching

- In-memory cache refreshes every 30 seconds
- Optimized data structures for fast query response
- Efficient data refresh strategy

### Frontend

#### SWR Data Fetching

- Stale-while-revalidate pattern for optimal user experience
- Automatic revalidation on focus, reconnect, and intervals
- Configurable refresh intervals with deduplication

#### Responsive UI

- Mobile-first design with Tailwind CSS
- Card-based layout for consistent presentation
- Loading, error, and empty states for all data scenarios

#### Visual Enhancements

- Random avatar generation with DiceBear API
- Random post images from Picsum Photos
- Interactive UI elements with smooth transitions

## API Documentation

### Top Users Endpoint

- **URL**: `/users`
- **Method**: GET
- **Description**: Returns the top 5 users with the most commented posts
- **Response Example**:

  ```json
  {
    "users": [
      {
        "id": "123",
        "name": "John Doe",
        "totalComments": 42
      },
      // ... more users
    ],
    "timestamp": "2023-06-01T12:34:56.789Z"
  }
  ```

### Posts Endpoint

- **URL**: `/posts`
- **Method**: GET
- **Query Parameters**: `type` (either "popular" or "latest")
- **Description**:
  - `popular`: Returns post(s) with the maximum number of comments
  - `latest`: Returns the 5 most recent posts
- **Response Example**:

  ```json
  {
    "type": "popular",
    "posts": [
      {
        "id": 456,
        "userId": 123,
        "content": "This is a popular post!",
        "commentCount": 25
      },
      // ... more posts (if multiple have the same max comment count)
    ],
    "timestamp": "2023-06-01T12:34:56.789Z"
  }
  ```

## Future Improvements

- Implement user authentication for personalized dashboards
- Add data visualization with charts and graphs
- Create advanced filtering and sorting options
- Add dark mode support
- Implement client-side caching for improved performance
