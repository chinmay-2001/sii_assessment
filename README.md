📘 User Management API – NestJS

<p align="center"> <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /> </p> <p align="center"> A scalable NestJS application implementing User CRUD, role-based permissions, group-based user management, DTO validation, and Swagger documentation. </p>

> 📖 Description

# This project is a backend API built using NestJS featuring:

# User CRUD operations

# Role & permission-based authorization

# Admin-managed user filtering by groups

# Full DTO validation

# Swagger API documentation

# Jest unit tests

📁 Project Structure
src/
├── app.module.ts
├── main.ts
├── data/
│ └── data.ts
├── user/
│ ├── user.controller.ts
│ ├── user.service.ts
│ └── dto/
│ ├── create-user.dto.ts
│ └── update-user.dto.ts
├── permission/
│ ├── permission.guard.ts
│ └── permission.decorator.ts
├── common/
│ └── exceptions/
│ └── permission-denied.exception.ts
└── tests/

🚀 Installation
npm install

▶️ Run the Application

# development

npm run start

# watch mode

npm run start:dev

# production build

npm run start:prod

🧪 Testing

# unit tests

npm run test

# watch mode

npm run test:watch

# test coverage

npm run test:cov

🔐 Authorization
All protected endpoints require this header:

makefile
Copy code
Authorization: <USER_ID>
Example:

makefile
Copy code
Authorization: 1
Permissions are validated using a custom PermissionGuard.

.

📚 Swagger Documentation

Swagger UI is available at:

http://localhost:3000/api

Includes:

Routes

Schemas

Validation rules

Request/response samples

samples

📦 API Endpoints
➕ Create User

POST /user

📄 List Users

GET /user

👥 Managed Users

GET /user/managed/:id

✏️ Update User

PATCH /user/:id

❌ Delete User

DELETE /user/:id

📌 Key Features

Clean and modular NestJS architecture

DTO validation using class-validator

Custom permission guard

Predefined roles, groups, and permissions

In-memory data store (no DB needed)

Jest-based unit testing

Swagger documentation
