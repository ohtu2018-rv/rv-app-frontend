# rv-app-frontend

[Travis CI badge] [Codecov badge]

## Introduction

/* TODO */

## How to get started

1. Clone the repo
2. Install Yarn (if not installed before)
3. `yarn install` to install project dependencies
4. `yarn start` for starting the app, or `yarn storybook` when developing modules

## How to develop

[Development guideline](DEVELOPMENT.md)

## How to build

Run `yarn build` to build the project.

## Documentation

For documentation, please click [this link](http://htmlpreview.github.io/?https://github.com/ohtu2018-rv/rv-app-frontend/blob/develop/styleguide/index.html)

## Tech

- React + React Redux
- ```create-react-app``` for easy bootstrapping

### Build

- Docker
- Jest + Enzyme for unit & integration testing

### Development

- React Storybook for development of UI components
- Write new tests as new code is written to make sure that each UI component gets tested
- Write documentation for components using React Styleguide

### Build pipeline

GitHub -> Travis CI + Codecov -> Heroku / AWS