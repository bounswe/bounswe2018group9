# Actopus Frontend Project
Actopus frontend contains the website and cross platform mobile applications. The project is mainly dependent on Ionic and Angular.

## How to run the code
You should have npm and node installed.

You should install Ionic CLI which is an extended version of Angular CLI.
```
npm install -g ionic@latest
```

To run the code on your computer
```
ionic serve
```

## Coding Style
We will be writing good code with commments when needed and structured properly.
For working easily and effectively, we utilize the power of typescript, especially interfaces.

 An example model,

 ``` ts
 interface Event {
    name: string;
    description: string;
    user: User;
 }
 ```
# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.0-rc.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
