# Patients

Web application written in React in order to manage patients and their treatments and bills.

## Why?

The main reason is to use React in a personal project.

## Previous steps

It is necessary to create a firebase application, with its own credentials. This way, the application can store the patient info.

Create a file with name firebaseConfig.js in the folder src.

You can use this template and replace the stars for the correct values in the object config.

````
const config = {
    apiKey: "********",
    authDomain: "********",
    databaseURL: "********",
    projectId: "********",
    storageBucket: "********",
    messagingSenderId: "********"
};

export default config;
````

## Execution

To run the application from local:

> yarn run start




