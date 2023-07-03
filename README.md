# Coding Assignment: RESTful API - clients

View the [assignment guidelines here](https://www.craft.me/s/BajD9tAHpBbTME).

## Branches

- `main` - Production branch. This branch represents the stable and production-ready version of the code. It is used for deployments to the live environment.
- `dev` - Development branch. This is the default branch for ongoing development work. It is where new features and bug fixes are implemented and tested before being merged into the main branch.

## Available Scripts

### `npm start`

Starts the application by running the compiled JavaScript file located at `dist/index.js`. This script is typically used in a production environment.

### `npm run server`

Starts the development server using nodemon, which automatically restarts the server whenever changes are made to the `src/index.ts` file. This script is useful during the development phase to enable a smoother development workflow.

### `npm run build`

Compiles the TypeScript source code into JavaScript. It is typically used before deploying or running the application in a production environment.

### `npm run lint`

Runs the ESLint linter on all TypeScript files. ESLint helps enforce code quality and style guidelines by highlighting potential issues or violations, based on the specified ESLint configuration.

### `npm run test`

Sets the environment to `test` and runs the tests using the Jest test runner. It provides verbose output for the test results.

### `npm run test:watch`

Sets the environment to `test` and runs the tests in watch mode, where Jest watches for changes in the test files and automatically reruns the tests. It provides verbose output for the test results.

## Tech Stack

### Production Dependencies

- [Node.js](https://nodejs.org/en/docs/) - an open-source JavaScript runtime environment for building server-side applications.
- [Express](https://expressjs.com/) - a web application framework for Node.js that makes it easier to build and manage APIs.
- [Mongoose](https://mongoosejs.com/) - an object data modeling (ODM) library for [MongoDB](https://www.mongodb.com/home) - open-source NoSQL database that is well-suited for storing data in JSON-like documents.
- [Winston](https://www.npmjs.com/package/winston) - a library for logging and managing messages in a Node.js application.
- [dotenv](https://www.npmjs.com/package/dotenv) - a library for loading environment variables from a .env file.

### Development Dependencies

- [Typescript](https://www.npmjs.com/package/typescript) - a typed version of JavaScript that improves code quality and maintenance.
- [ESLint](https://www.npmjs.com/package/eslint) with [Typescript parser](https://www.npmjs.com/package/@typescript-eslint/parser) enforces coding style and helps catch errors in development.
- [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution environment and REPL for Node.js.
- [Nodemon](https://www.npmjs.com/package/nodemon) - a utility that automatically restarts a Node.js server when changes are detected in source files.
- [Jest](https://jestjs.io/) - JavaScript testing framework and test runner.
- [SuperTest](https://www.npmjs.com/package/supertest) - a library for testing HTTP servers in Node.js, providing a high-level abstraction for testing HTTP requests and responses.
- [ts-jest](https://www.npmjs.com/package/ts-jest) - a TypeScript preprocessor for Jest that enables running TypeScript code directly in Jest tests.
