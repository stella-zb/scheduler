# Interview Scheduler
An Single page application built using React. User can book / cancel / edit the interview on the week scheduler. 

Data is persisted by the API server using a PostgreSQL database.

Components building with storybook.
Unit testing and intergation testing with Jest through the development of the project.
Cypress for end-to-end testing.

## Setup

Install dependencies with `npm install`.

## Dependencies
- React
- Webpack, Babel
- Axios
- [@test-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library#peer-dependencies)
- react-test-renderer
- Storybook, Webpack Dev Server, Jest

## Running Webpack Development Server
Please make sure you have both scheduler and [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) servers running to load the data

```sh
npm start
```
Go to <http://localhost:8000/> in your browser

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook

```
## Final Product
!["Landing Page]()
!["Adding Interview]()
!["Show booking info with empty spots update]()