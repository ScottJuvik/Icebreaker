<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->

# Welcome to Ice-Breaker Activities Repository

## Introduction
Many young individuals find it challenging to establish new acquaintances, especially in new environments where they know few or no one else participating in the event. Our target audience expresses that they often step out of their comfort zones to attend events in hopes of meeting like-minded people. To ease the atmosphere and facilitate conversations, customers express that it would be beneficial to have a collection of ice-breaker activities readily available. Therefore, I aim to create a service where users can find suggestions for such ice-breaker activities.

## Project Description
This project aims to provide a platform offering a comprehensive list of ice-breaker activities where users can search for or submit specific activities and add them to a queue that can be shared with other users. It should be possible to differentiate between different types of ice-breaker activities based on the circumstances they are suitable for. Each ice-breaker activity will have its own page with a description, rules, as well as ratings and reviews provided by other users. Additionally, there will be a list of popular ice-breaker activities for users who are unsure of what they are looking for. The goal of the service is to make it easier for individuals to initiate conversations and get to know new people.

## Key Features
- Browse and search for ice-breaker activities
- Submit new ice-breaker activities
- Categorize activities based on suitability
- Detailed pages for each activity including description, rules, ratings, and reviews
- Queue functionality to save and share activities
- List of popular ice-breaker activities for easy reference

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Version Control: Git, GitLab

## Getting Started
To run this project locally, follow these steps:
1. Clone this repository to your local machine with 
    ```
    git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2024/produktomraade-2/gruppe-28/icebreaker_frontend.git
    ```
2. Install the necessary dependencies using npm:  
    ```
    npm install react react-dom react-router-dom axios typescript @types/react @types/react-dom @types/react-router-dom
    
    npm install 
    ```
    or using yarn: 
    ```
    yarn add react react-dom react-router-dom axios typescript @types/react @types/react-dom @types/react-router-dom

    yarn install
    ```
3. Go into the project
    ```
    cd .\icebreaker_frontend\
    ```
4. Run the development server 
    ```
    npm start
    ```
    eller
    ```
    yarn start
    ```