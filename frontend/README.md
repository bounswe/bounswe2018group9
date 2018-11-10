
# Actopus Frontend Project
Actopus frontend contains the website and cross platform mobile applications. The project is mainly dependent on Ionic and Angular.

## Quickstart

1. You should have `npm` and `node` installed.


2. You should install Ionic CLI which is an extended version of Angular CLI.

```
npm install -g ionic@latest
```

3. Serve/test the application on your local browser with **cloud version** of `Actopus Backend` with:

```
npm start
```

Or, if you wish to serve the application with a local copy of `Actopus Backend`, you can use:

```
npm start:local
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
