# Refund API

A REST API for submitting and managing reimbursement requests.

This project was developed during the **Fullstack course by Rocketseat** and is based on a practical workflow for employee reimbursement submissions, file uploads, and role-based access control.

## Overview

The API allows you to:

- Create user accounts with different roles
- Authenticate users and generate JWT tokens
- Submit reimbursement requests with categories, amounts, and attachment filenames
- Upload image files and move them to a public storage folder
- List and inspect reimbursements according to user role

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma**
- **SQLite**
- **JWT** for authentication
- **bcrypt** for password hashing
- **multer** for file uploads
- **zod** for input validation

## Requirements

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following variable:

```env
JWT_SECRET=your-secret-key
```

## Database

This project uses **SQLite** with Prisma.

To apply the existing migrations and generate the Prisma client, run:

```bash
npx prisma migrate dev
```

If you want to inspect the database visually, you can also use:

```bash
npx prisma studio
```

## Running the Project

Start the development server with:

```bash
npm run dev
```

The API runs on port **3333**.

## Insomnia Collection

This project includes an exported Insomnia collection in [Insomnia-data](Insomnia-data).

The collection is already configured with:

- `BASE_URL` set to `http://localhost:3333`
- route groups for `users`, `sessions`, `refunds`, and `uploads`
- chained authentication between requests where needed

### How to use it

1. Open Insomnia.
2. Import the [Insomnia-data](Insomnia-data) file into your workspace.
3. Make sure the API is running locally on port `3333`.
4. Run the requests in this order:
  - create a user
  - log in to generate a token
  - create an upload
  - create a refund using the uploaded filename
  - list or inspect refunds depending on the user role

### Notes

- Requests that require authentication expect a valid JWT token.
- The upload request must send a multipart form field named `file`.
- Uploaded files are saved under `tmp/uploads` and are also exposed by Express at `/uploads`.

## Authentication

The API uses JWT tokens.

After logging in, include the token in the `Authorization` header:

```http
Authorization: Bearer <your-token>
```

## User Roles

There are two roles in the system:

- `employee`
- `manager`

Some routes are protected by role-based authorization.

## File Uploads

Uploaded files are handled in two steps:

1. The file is received in a temporary folder (`tmp`)
2. The file is moved to `tmp/uploads`

Uploaded images are also served statically by Express at:

```http
/uploads/<filename>
```

The upload route expects a multipart form field named `file`.

## API Endpoints

### Users

#### `POST /users`
Creates a new user.

**Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "employee"
}
```

**Notes**

- `role` is optional and defaults to `employee`
- Passwords are stored hashed

---

### Sessions

#### `POST /sessions`
Authenticates a user and returns a JWT token.

**Body**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "jwt-token",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  }
}
```

---

### Refunds

#### `POST /refunds`
Creates a reimbursement request.

**Access**: `employee`

**Body**

```json
{
  "name": "Taxi to client meeting",
  "category": "transport",
  "amount": 120.5,
  "filename": "uploaded-file-name.jpg"
}
```

**Categories**

- `food`
- `others`
- `services`
- `transport`
- `accommodation`

---

#### `GET /refunds`
Lists reimbursement requests.

**Access**: `manager`

**Query parameters**

- `name` - filters by user name
- `page` - pagination page number
- `perPage` - number of items per page

Example:

```http
GET /refunds?name=John&page=1&perPage=10
```

---

#### `GET /refunds/:id`
Returns a single reimbursement request by ID.

**Access**: `employee` or `manager`

---

### Uploads

#### `POST /uploads`
Uploads an image file.

**Access**: `employee`

**Content-Type**: `multipart/form-data`

**Field name**

- `file`

**Response**

```json
{
  "filename": "generated-file-name.jpg"
}
```

## Project Structure

```text
src/
  app.ts
  server.ts
  configs/
  controllers/
  database/
  middlewares/
  providers/
  routes/
  types/
  utils/
prisma/
  schema.prisma
tmp/
  uploads/
```

## Main Notes

- The project uses `tsx watch` for development
- Static uploads are exposed through Express
- Validation is handled with `zod`
- Authorization is enforced by custom middlewares
- The database is managed with Prisma

## About This Project

This API was built as part of the **Rocketseat Fullstack course** and reflects a learning project focused on authentication, authorization, file upload handling, and persistence with Prisma.