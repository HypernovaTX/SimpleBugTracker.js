# Simple Bug Tracker - Back End

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#front-end">Front end</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with-back-end">Built with</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#how-it-works">How it works</a></li>
    <li><a href="#what-i-have-learned">What I have learned</a></li>
    <li><a href="#what-i-have-messed-up">What I have messed up</a></li>
  </ol>
</details>


## About the project
This is the back end portion of the Bug Track project I have written right after learning ReactJS. To challenge myself, I created this as a more complex version of "To-Do" list. The project is incomplete since I have a freelance project to follow up, in which, you may see some unused/empty codes. In addition, this project is an entry level excercise and it is never meant for optimization.

### Front end
The front end is a separate project which can be accessed here: https://github.com/HypernovaTX/SimpleBugTracker.js-Frontend-


## Built with (back end):
* [Express](https://expressjs.com/)
* [Cors](https://www.npmjs.com/package/cors)

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/HypernovaTX/SimpleBugTracker.js-Backend-.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. To start testing
    ```sh
    npm start
    ```

## How it works:
1. The `root` (index.js) has several app.post
2. app.post calls to `dbimport` for accessing DB and `queries` for a preset of SQL queries

## What I have learned:
- Understanding React components, Axios requests, more UI
- Understanding requests/response in React and Express
- Improvements on code organization and readability
- Improvements on logics/problem solving
 
## What I have messed up:
This is a list of the known issues I noticed as of June 2021 when I come back to review my codes:
- Some of the codes can be condensed
- Left many unnecessary comments
- The objects are poorly organized



This is the backend of the bug tracking software that runs under Node JS environment with MySQL database access, please [check here](https://github.com/HypernovaTX/SimpleBugTracker.js-Frontend-) for frontend.
