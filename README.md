# rv-app-frontend

## Tech

### Front-end

- React + React Redux
- ```create-react-app``` for easy bootstrapping

### Build

- Docker
- Jest + Enzyme for unit & integration testing

### Development

- React Storybook for development of UI components
- Write new tests as new code is written to make sure that each UI component gets tested

## Build pipeline

GitHub -> Travis CI + Codecov -> Heroku / AWS

## Starting instructions

1. Clone the repo
2. Install Yarn (if not installed before)
3. `yarn install` to install project dependencies
4. `yarn start` for starting the app, or `yarn storybook` when developing modules

## Building instructions

Run `yarn build` to build the project.