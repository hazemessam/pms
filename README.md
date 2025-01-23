# PMS Backend

Backend for patient management system.

## Content

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [API Docs](#api-docs)

## Features

- Allow healthcare providers to manage patients and their medial history.
- User authentication and authorization.
- Audit logging user actions.

## Tech Stack

- TypeScript
- Node.js
- NestJs
- TypeORM
- PostgreSQL
- Docker
- Swagger

## Project Setup

1. Clone the repo

   ```bash
   git clone https://github.com/hazemessam/pms.git
   ```

2. Move to the project directory

   ```bash
   cd pms
   ```

3. Add `.env` file by cloning the `.env.example` file

   ```bash
   cp .env.example .env
   ```

4. Set the following env vars at the `.env` file

   ```bash
   PORT=

   DB_HOST=
   DB_PORT=
   DB_NAME=
   DB_USERNAME=
   DB_PASSWORD=

   JWT_SECRET=

   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   ```

   > Note: `DB_HOST` will be set automatically to the db service name if we used docker compose.

5. Build and run the docker containers

   ```bash
   docker compose up --build
   ```

## API Docs

After running the application you can access the interactive swagger API docs at `http://localhost:{port}/api/docs`.
