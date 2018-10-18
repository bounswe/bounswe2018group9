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
