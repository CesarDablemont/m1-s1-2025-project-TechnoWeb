# m1-s1-2025 project

## Application Overview

Welcome to our library management application.
This project is built on a robust NestJS API and a modern React frontend, providing complete management and a structured display of data related to books, authors, clients, and sales.

## General Navigation

The application includes navigation breadcrumbs to help users identify their current location within the interface.

An accessible menu allows navigation to:
  - the home page,
  - the clients list,
  - the books list,
  - the authors list,
  - the sales list.

## Main Features
Project Architecture
  - backend           → TypeScript, NestJS, TypeORM, SQLite
  - frontend          → TypeScript, React, Vite, Ant Design, @tanstack/react-router

## Getting Started

To run the project locally, you need to start both the NestJS API and the React frontend application.
Follow the steps below to set up and launch each part of the application.

## Start the NestJS API

Navigate to the backend folder, install the dependencies, and run the development server:

```
cd nest-api
npm install
npm run start:dev
```

This will start the API locally, allowing the frontend to communicate with it.

## Start the React Application

Once the API is running, open a new terminal, navigate to the React application folder, install the required packages, and launch the development server:

```
cd react-app
npm install
npm run dev
```

The frontend will then be accessible in your browser, and you'll be able to interact with the application using the data provided by the NestJS API.

## Project Team

- Olivier Clavier
- César Dablemont
- James Lemoine
- Steve-Marley Somo-Toche
