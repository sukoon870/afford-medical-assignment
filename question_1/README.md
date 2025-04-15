# Social Media Analytics API

A microservice that provides analytical insights for a social media platform. This application fetches data from a test server and provides analytics endpoints for top users and popular/latest posts.

## Features

- **Token Management**: Automatic handling of authentication tokens with renewal
- **Caching**: Efficient in-memory caching to reduce load on the test server
- **Analytics Endpoints**:
  - Top users with the most commented posts
  - Popular posts with the most comments
  - Latest posts in real-time

## Project Structure

```
question_1/
├── src/
│   ├── index.ts            # Main application with Express routes
│   ├── test-server-utils.ts # Utilities for communicating with the test server
│   ├── env.ts              # Environment configuration
│   └── types.ts            # Type definitions
├── auth.json               # Authentication credentials (gitignored)
├── auth.json.example       # Example authentication credentials
├── .env                    # Environment variables (gitignored)
├── .env.example            # Example environment variables
└── README.md               # This file
```

## API Endpoints

### 1. Top Users

- **Endpoint**: `GET /users`
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

### 2. Posts (Popular or Latest)

- **Endpoint**: `GET /posts?type=popular` or `GET /posts?type=latest`
- **Description**:
  - `popular`: Returns post(s) with the maximum number of comments
  - `latest`: Returns the 5 most recent posts
- **Query Parameters**:
  - `type`: Either "popular" or "latest" (default: "popular")
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

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm or yarn

### Installation

1. Clone the repository
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

### Configuration

#### Environment Variables (.env)

Create a `.env` file at the root of the project with the following variables:

```
# Server configuration
PORT=3000

# Test server credentials 
CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here

# Test server endpoint
TEST_SERVER_ENDPOINT=https://test-server.example.com/api
```

#### Authentication (auth.json)

Create an `auth.json` file at the root of the project with your authentication details:

```json
{
    "email": "your-email@example.com",
    "name": "your-name",
    "rollNo": "your-roll-number",
    "accessCode": "your-access-code",
    "clientID": "your-client-id",
    "clientSecret": "your-client-secret"
}
```

### Running the Application

```
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## Implementation Details

### Token Management

- The application uses a static `TokenManager` class to handle authentication tokens
- Tokens are automatically renewed 10 minutes before expiration
- Token data is cached in a `.token-cache.json` file for persistence between restarts

### Data Caching

- User and post data is cached in memory for 30 seconds
- This reduces load on the test server and improves response times
- Fresh data is fetched automatically when the cache expires

### Error Handling

- Comprehensive error handling for API requests
- Axios is used for HTTP requests with enhanced error information
- Failed data refreshes are retried with exponential backoff

## Development

### Building the Project

```
npm run build
```

### Running in Development Mode

```
npm run dev
```
