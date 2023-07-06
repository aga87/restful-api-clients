# Coding Assignment: Clients API (RESTful)

## About

View the [assignment guidelines here](https://www.craft.me/s/BajD9tAHpBbTME).

### User Stories

- I can create a new client record.
- I can view a listing of all clients.

### Reliability

The **health check** endpoint is used to verify the operational status and health of the API.

**Data validation**: The API performs data validation on incoming requests before persisting them in the database to safeguard against invalid or malformed data. This guarantees the consistency and reliability of the stored information.

**Error handling** allows the API to gracefully handle and respond to errors, providing helpful messages and guidance to users.

**Integration tests** ensure that the API is functioning correctly and in accordance with the requirements.

**Error logging** helps in identifying and troubleshooting issues within an application by providing a record of errors and exceptions that occur during its execution. In production, errors are logged to **Google Cloud Logging** service.

### Security

All client data is stored in the database in an **encrypted** format. For this purpose, the API leverages the capabilities of **Google Cloud KMS (Key Management Service)**, a trusted managed service offering secure key storage, rotation, and encryption/decryption functionalities.

CORS middleware is used to set and enforce the **Cross-Origin Resource Sharing policy**. It ensures that only authorized (whitelisted) origins can access server resources.

Additionally, Helmet middleware helps to secure the API by setting HTTP response headers that enhance security.

### Performance

**Pagination** is implemented to improve API performance. Paginating the results allows to retrieve and process smaller chunks of data at a time. In particular, this will enable more efficient use of the Google KMS resources and may enhance the perceived responsiveness of the API.
It may also help with scalability, by allowing to handle a large number of concurrent requests more effectively.

### API Documentation

The API is self-discoverable thanks to the use of **HATEOAS**. HATEOAS provide links to related resources within the responses, allowing clients to easily navigate and discover the API's capabilities without requiring external documentation.

Additionally, a Postman collection is included in the codebase, to facilitate collaboration among team members by providing a standardized and shareable representation of the API specifications and configurations.

## Branches

- `main` - Production branch. This branch represents the stable and production-ready version of the code. It is used for deployments to the live environment.
- `dev` - Development branch. This is the default branch for ongoing development work. It is where new features and bug fixes are implemented and tested before being merged into the main branch.

## Available Scripts

### `npm install`

Downloads and installs all dependencies and packages necessary to run the application.

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
- [Joi](https://www.npmjs.com/package/joi) - a library for validating JavaScript objects.
- [@google-cloud/kms](https://www.npmjs.com/package/@google-cloud/kms) - Google Cloud Key Management Service (KMS) API client for Node.js.
- [Winston](https://www.npmjs.com/package/winston) - a library for logging and managing messages in a Node.js application.
- [@google-cloud/logging-winston](https://www.npmjs.com/package/@google-cloud/logging-winston) - provides Google Cloud Logging transport for Winston logger.
- [dotenv](https://www.npmjs.com/package/dotenv) - a library for loading environment variables from a .env file.
- [cors](https://www.npmjs.com/package/cors) - Node.js CORS middleware for setting Cross-Origin Resource Sharing policy.
- [helmet](https://www.npmjs.com/package/helmet) - Helmet helps secure Express apps by setting HTTP response headers.

### Development Dependencies

- [Typescript](https://www.npmjs.com/package/typescript) - a typed version of JavaScript that improves code quality and maintenance.
- [ESLint](https://www.npmjs.com/package/eslint) with [Typescript parser](https://www.npmjs.com/package/@typescript-eslint/parser) enforces coding style and helps catch errors in development.
- [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution environment and REPL for Node.js.
- [Nodemon](https://www.npmjs.com/package/nodemon) - a utility that automatically restarts a Node.js server when changes are detected in source files.
- [Jest](https://jestjs.io/) - JavaScript testing framework and test runner.
- [SuperTest](https://www.npmjs.com/package/supertest) - a library for testing HTTP servers in Node.js, providing a high-level abstraction for testing HTTP requests and responses.
- [ts-jest](https://www.npmjs.com/package/ts-jest) - a TypeScript preprocessor for Jest that enables running TypeScript code directly in Jest tests.
