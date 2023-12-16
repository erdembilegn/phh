# spa-template

This is a template for a server and client application built with Node.js, Express, and React. The server provides a RESTful API for the client to interact with, and the client provides a user interface for the user to interact with the server.

## Getting Started

To get started, clone this repository and run `npm install` in both the server and client directories to install the dependencies. You can then use the following scripts:

### Server

Builds the TypeScript files and generates the OpenAPI spec and TSOA routes.

```bash
npm run build
```

Starts the server.

```bash
npm start
```

Starts the server in development mode with live reloading.

```bash
npm run dev
```

Formats the code with Prettier.

```bash
npm run format
```

Formats the code with Prettier and fixes any errors.

```bash
npm run format:fix
```

Cleans the build and spec directories.

```bash
npm run clean
```

Runs a database migration with Prisma.

```bash
npm run migration
```

### Client

Starts the development server.

```bash
npm start
```

Builds the production-ready client.

```bash
npm run build
```

Runs the client in development mode with live reloading.

```bash
npm run dev
```
