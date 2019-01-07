
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

4. Serve the web application for continuous development


```
ionic serve
```

5. Serve the android application for development

```
ionic cordova run android
```

## Building

1. You can build the web development version of the project running

```
ionic build
```

2. You can build the web production version of the project running

```
ionic build --prod --aot
```

3. You can build the android development version of the project running

```
ionic cordova build android
```

4. You can build the android production version of the project running

```
ionic cordova build android --prod --release
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
