
# Post Service

[![NestJS](https://img.shields.io/badge/NestJS-9.0.0-red)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.21.1-blue)](https://www.prisma.io/)
[![AWS Cognito](https://img.shields.io/badge/AWS%20Cognito-Enabled-green)](https://aws.amazon.com/cognito/)
[![Redis](https://img.shields.io/badge/Redis-Cache-brightgreen)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

An advanced RESTful API for a media application built with NestJS, Prisma ORM, AWS Cognito for authentication, Redis caching, and more. This API is designed to handle CRUD operations for posts, comments, tags, and supports secure JWT-based authentication with version-controlled endpoints.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Posts](#posts)
  - [Tags](#tags)
  - [Comments](#comments)
- [Error Handling](#error-handling)
- [License](#license)

---

## Features

- **Dynamic API Versioning**: Supports versioned APIs with dynamic prefixes based on environment configuration.
- **Secure JWT Authentication**: Integrated with AWS Cognito for authentication, enabling secure, scalable user management.
- **Advanced Error Handling**: Custom error handling for validation errors, authentication issues, and database exceptions.
- **Redis Caching**: Redis integration for efficient caching of frequently accessed data.
- **Prisma ORM**: Prisma for robust database management and schema modeling.
- **Role-based Access Control**: Configurable access control to manage route protection across different API modules.
- **Modular Architecture**: Clean and scalable module-based design with NestJS.

---

## Technologies Used

| Technology  | Description                              |
|-------------|------------------------------------------|
| NestJS      | Framework for building scalable APIs     |
| Prisma      | ORM for type-safe database interactions  |
| AWS Cognito | Secure user authentication and management|
| Redis       | In-memory caching solution               |
| Docker      | Containerization of the API              |
| Postman     | API testing and debugging                |

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- Docker (optional, for Redis setup)
- AWS Account (for Cognito)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

### Environment Variables

Set up a `.env` file in the root directory with the following configuration:

```env
# Environment
NODE_ENV=development
API_VERSION=v2

# Database Configuration
DATABASE_URL=postgresql://<dbUser>:<dbPassword>@<dbHost>:5432/<dbName>

# Redis Configuration
REDIS_HOST=<redisHost>
REDIS_PORT=6379

# AWS Configuration
AWS_REGION=<awsRegion>
AWS_COGNITO_USER_POOL_ID=<cognitoUserPoolId>
AWS_COGNITO_CLIENT_ID=<cognitoClientId>
AWS_ACCESS_KEY_ID=<awsAccessKeyId>
AWS_SECRET_ACCESS_KEY=<awsSecretAccessKey>

# Cognito Configuration
COGNITO_JWKS_URL=https://cognito-idp.<awsRegion>.amazonaws.com/<cognitoUserPoolId>/.well-known/jwks.json

# JWT Configuration
JWT_SECRET=<jwtSecret>

```

---

## Usage

Start the application:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api/v2` (adjusted based on API_VERSION in `.env`).

---

## Endpoints

### Auth

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| POST   | `/auth/login`    | Authenticate user and return JWT   |
| POST   | `/auth/register` | Register a new user               |

### Posts

| Method | Endpoint       | Description                        |
|--------|-----------------|------------------------------------|
| GET    | `/posts`       | Retrieve all posts                |
| POST   | `/posts`       | Create a new post                 |
| GET    | `/posts/:id`   | Retrieve a specific post by ID    |
| PUT    | `/posts/:id`   | Update a specific post by ID      |
| DELETE | `/posts/:id`   | Delete a specific post by ID      |

### Tags

| Method | Endpoint       | Description                        |
|--------|-----------------|------------------------------------|
| GET    | `/tags`        | Retrieve all tags                 |
| POST   | `/tags`        | Create a new tag                  |
| GET    | `/tags/:id`    | Retrieve a specific tag by ID     |
| DELETE | `/tags/:id`    | Delete a specific tag by ID       |

### Comments

| Method | Endpoint               | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/posts/:id/comments`  | Retrieve comments for a post     |
| POST   | `/posts/:id/comments`  | Add a comment to a post          |
| DELETE | `/comments/:id`        | Delete a specific comment by ID  |

---

## Error Handling

The API provides consistent error handling across all endpoints. Responses follow this format:

```json
{
    "status": "fail",
    "code": 401,
    "message": "An error occurred",
    "errors": [
        "No token provided"
    ]
}
```

- **400 Bad Request** - Validation errors, missing required fields.
- **401 Unauthorized** - Authentication errors.
- **404 Not Found** - Resource not found.
- **500 Internal Server Error** - General server errors.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Author

Developed by [Ferdi Ardiansa](https://github.com/itsferdiardiansa).
