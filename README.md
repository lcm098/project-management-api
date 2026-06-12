# Project Management API

## Features

- Authentication
- JWT Access Token
- Refresh Token
- Logout
- RBAC
- Project CRUD

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

## Environment Variables

See .env.example

## Roles

- USER
- MANAGER
- ADMIN

## API Endpoints

### Auth

POST /auth/register

POST /auth/login

POST /auth/refresh-token

POST /auth/logout

### Users

GET /users/me

PUT /users/me

GET /users

PATCH /users/:id/role

### Projects

GET /projects

POST /projects

PUT /projects/:id

DELETE /projects/:id