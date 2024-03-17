### README.md

# LetFLix movie App

## Project Description

A client-side for an app called myFlix, built using React based on its existing server-side code, comprising a REST API and a database. It offers a comprehensive platform for movie enthusiasts to explore, favorite, and learn more about a wide range of movies.

## Project Dependencies

This project leverages several key technologies and libraries, including:

- React: For building the user interface with a component-based architecture.
- ReactDOM: Allows the React app to communicate with the DOM.
- React-Router-Dom: Manages navigation and routing within the app.
- Bootstrap & React-Bootstrap: Used for styling and to utilize React components that mirror Bootstrap components.
- React-Bootstrap-Icons: Provides icons as React components from Bootstrap Icons.
- Prop-Types: For type-checking the props passed to components.
- Moment: A library to parse, validate, manipulate, and display dates and times in JavaScript.
- Parcel (v.2.12.0) & Parcel/Transformer-Sass (v.2.12.2): For application bundling and Sass support.

## Process

### The API the Project Uses

The app is designed to work with the `movie_api`, which provides access to a database of movies, directors, genres, and users. For more details about the API, visit the [GitHub repository](https://github.com/pablocubo/Movie-API).

### Link to App

The myMovie App is hosted on Netlify and can be accessed at: [myMovie App](https://letflixnow.netlify.app/).

## Views

- **Login View:** Allows users to log in with a username and password.
- **Signup View:** Enables new users to register by providing a username, password, email, and date of birth.
- **Main View:** Displays all movies with image, title, and description.
- **Single Movie View:** Offers detailed information about a single movie.
- **Profile View:** Shows user details, allows user updates, deregistration, and management of favorite movies.

## Set up This App

1. Clone this repository to your local machine.
2. Navigate to the `movie_api-client` folder and run `npm install` to install all project dependencies.
3. Start the application by running `parcel src/index.html` in your terminal.

This setup will launch the myMovie App in your default web browser, ready for you to explore and interact with the vast world of movies it offers.
