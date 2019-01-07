
# Actopus Frontend Project
Actopus frontend contains the website and cross platform mobile application. The project is mainly dependent on Ionic and Angular.

## Quickstart

1. You should have `npm` and `node` installed.

2. You should change your directory and install dependencies

```
cd frontend
npm install
```

3. You should install Ionic CLI which is an extended version of Angular CLI for easy development

```
npm install -g ionic@latest
```

4. Serve the Ionic application for continuous development


```
ionic serve
```

4. You can build the development version of the project running

```
npm run build
```

5. You can build the production version of the project running

```
npm run build:prod
```

This will bundle all the code and moves it to `backend/www` folder

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
