
# Billeasy Book Review API

A RESTful API built with Node.js, Express, and MongoDB for managing books and reviews, with user authentication and advanced search capabilities.


## Features

- **User Authentication**  
  JWT-based authentication with HTTP-only cookies:
  - Secure signup/login/logout
  - Password hashing with bcrypt
  - Protected routes

- **Book Management**  
  Full CRUD operations for books:
  - Add new books (authenticated users only)
  - Get books with pagination
  - Filter by genre/author
  - Detailed book view with average rating

- **Review System**  
  Robust review functionality:
  - Submit ratings (1-5 stars) with comments
  - One review per user per book
  - Update/delete own reviews
  - Paginated review lists

- **Search**  
  Advanced search capabilities:
  - Case-insensitive title/author search
  - Partial match support
  - Returns author details in results

- **Docker Support**  
  Ready-to-run containerization:
  - Pre-built Docker image available

## Getting Started

### Requirements

- Node.js v22
- MongoDB v5+
- Docker (optional)
- Postman or similar API client for testing

### Local Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/gulshan1002/billeasy.git
    ```
    ```bash
   cd billeasy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**  
   Create `.env` file in root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/billeasy
   JWT_SECRET=your_secure_secret_here
   JWT_EXPIRES_IN=1d
   NODE_ENV=production
   ```

4. **Start MongoDB**  
   Ensure MongoDB is running locally.

5. **Run the server**
   ```bash
   npm start
   ```
   API will be available at `http://localhost:3000`

---

## Docker Deployment

### Quick Start with Docker Hub

1. **Pull the image**
   ```bash
   docker pull gulshan452/billeasy:4b9923fd5c81d420dd0a00593a7dac920db302f2
   ```

2. **Run container**  
 Open Docker Desktop and go to the Docker Images tab. Click on the image and select "Run".
    - Set container name: `billeasy`
    - PORT Mapping:
        - Host port: `3000`
        - Container port: `3000`  
    - Set environment variables:
        - `PORT=3000`
        - `MONGO_URI=mongodb://doc`
        - `JWT_SECRET=your_secure_secret`
        - `JWT_EXPIRES_IN=1d`
        - `NODE_ENV=production`
    - Set port mapping:
   - Map port 3000 to host.
    - Click "Run" to start the container.
    - Access the API at `http://localhost:3000`
    - Use Postman or similar tools to test the API.

---

## API Documentation

### Authentication

**Signup**  
`POST /auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Login**  
`POST /auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Logout**  
`GET /auth/logout` (Requires valid JWT)

---

### Book Endpoints

**Create Book**  
`POST /books` (Authenticated)
```json
{
  "title": "Sample Book",
  "genre": "Fiction",
  "content": "Book description..."
}
```

**List Books**  
`GET /books?page=1&limit=10&genre=Fiction&author=userId`

**Get Book Details**  
`GET /books/:id?reviewPage=1&reviewLimit=5`

**Search Books**  
`GET /books/search?q=search+term`

---

### Review Endpoints

**Add Review**  
`POST /books/:id/reviews` (Authenticated)
```json
{
  "rating": 5,
  "comment": "Excellent read!"
}
```

**Update Review**  
`PUT /reviews/:id` (Authenticated)
```json
{
  "rating": 4,
  "comment": "Good but could be better"
}
```

**Delete Review**  
`DELETE /reviews/:id` (Authenticated)

---

## Error Handling

Standard error format:
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes**:
- 400 Bad Request - Invalid input
- 401 Unauthorized - Missing/invalid token
- 403 Forbidden - Review ownership mismatch
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server-side issue

---

## Testing

Test endpoints using:
```bash
curl -X POST http://localhost:3000/auth/signup -H "Content-Type: application/json" -d '{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}'
```

Or use API clients like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)

```
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.
## Acknowledgements
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JWT authentication
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management
- [Docker](https://www.docker.com/) - Containerization
- [Postman](https://www.postman.com/) - API testing
- [Nodemon](https://nodemon.io/) - Development tool for auto-restarting Node.js applications
- [Cors](https://www.npmjs.com/package/cors) - Cross-Origin Resource Sharing

### Contact
For any questions or feedback, please reach out to:
- **Gulshan Kumar** - [gulshan190210@gmail.com](mailto:gulshan190210@gmail.com)
- **GitHub** - [gulshan1002](https://github.com/gulshan1002)
- **LinkedIn** - [Gulshan Kumar](https://www.linkedin.com/in/gulshan1002/)