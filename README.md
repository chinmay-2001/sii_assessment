# User Management API — NestJS

A scalable NestJS backend implementing user CRUD, role-based permissions, group-based user management, DTO validation, and Swagger documentation.

## Features

- User CRUD operations
- Role & permission-based authorization (custom PermissionGuard)
- Group-based user filtering (admin-managed)
- DTO validation with class-validator
- Swagger API documentation
- In-memory data store (no DB required)
- Jest unit tests

## Project Structure

src/

- app.module.ts
- main.ts
- data/data.ts
- user/
  - user.controller.ts
  - user.service.ts
  - dto/
    - create-user.dto.ts
    - update-user.dto.ts
- permission/
  - permission.guard.ts
  - permission.decorator.ts
- common/exceptions/permission-denied.exception.ts
- tests/

## Requirements

- Node.js 14+ (or compatible)
- npm

## Installation

1. Clone the repo
2. Install dependencies

```bash
npm install
```

## Running the app

Development:

```bash
npm run start
```

Watch mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run start:prod
```

The app runs by default on http://localhost:3000

## Testing

Unit tests:

```bash
npm run test
```

Watch tests:

```bash
npm run test:watch
```

Test coverage:

```bash
npm run test:cov
```

E2E tests:

```bash
npm run test:e2e
```

Note: We recommend installing a Jest extension in your editor to run tests from the IDE.

## Swagger

Swagger UI is available at:
http://localhost:3000/api

It includes routes, schemas, validation rules, and request/response samples.

## Authorization

Protected endpoints require an Authorization header containing the user id:

Header:

```
Authorization: <USER_ID>
```

Example:

```
Authorization: 1
```

Permissions are validated using the custom PermissionGuard.

## API Endpoints (summary)

- POST /user — Create user
- GET /user — List users
- GET /user/managed/:id — List users managed by group id
- PATCH /user/:id — Update user
- DELETE /user/:id — Delete user

## Notes

- Uses an in-memory data store for simplicity; replace with a DB for production.
- DTOs enforce validation via class-validator.
- Modify roles/permissions in src/data/data.ts.

...existing code...

````// filepath: c:\Users\Chinm\Desktop\SII_Assessment\sii_assessment\README.md
...existing code...
# User Management API — NestJS

A scalable NestJS backend implementing user CRUD, role-based permissions, group-based user management, DTO validation, and Swagger documentation.

## Features
- User CRUD operations
- Role & permission-based authorization (custom PermissionGuard)
- Group-based user filtering (admin-managed)
- DTO validation with class-validator
- Swagger API documentation
- In-memory data store (no DB required)
- Jest unit tests

## Project Structure
src/
- app.module.ts
- main.ts
- data/data.ts
- user/
  - user.controller.ts
  - user.service.ts
  - dto/
    - create-user.dto.ts
    - update-user.dto.ts
- permission/
  - permission.guard.ts
  - permission.decorator.ts
- common/exceptions/permission-denied.exception.ts
- tests/

## Requirements
- Node.js 14+ (or compatible)
- npm

## Installation
1. Clone the repo
2. Install dependencies

```bash
npm install
````
