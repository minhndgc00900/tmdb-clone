# 👨🏽‍💻 Tmdb Clone Web

**Movies** is a movies app using the [The Movie Database API](https://developers.themoviedb.org/3).

## 📌 Features

This project is updated with:

- [React 18x](https://reactjs.org)
- Redux
- SCSS
- Eslint

## User Stories

The following **required** functionality is completed:

- [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
- [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
- [x] Add a search bar.
- [x] User can view movie details by tapping on a cell.
- [x] User sees loading state while waiting for the API.
- [x] User sees an error message when there is a network error.
- [x] Simple responsive.

The following **optional** features are implemented:

- [x] Implement segmented control to switch between list view and grid view.
- [x] All images fade in.
- [x] Implement lazy load image.
- [x] Customize the highlight and selection effect of the cell.
- [x] Improve UX loading by skeleton loading.
- [x] Enhance responsive.

The following **additional** features are implemented:

- [x] Infinite Scroll
- [x] Debounce Search
- [x] Breadcrumbs on Movie Detail page
- [x] commitlint for the project

## Video Walkthrough

- https://drive.google.com/file/d/14CLrPsUItJGxH_rKt2T_d8kT2n4VE6v_/view

## 🧐 Getting Started

1. Check if your [Node.js](https://nodejs.org/) version is >= 20.10.0
2. Clone this repository.
3. Create an env setting `cp .env-example .env`.
4. You can use `npm` or `yarn` for package manager, eg:

- NPM
  - Run `npm install` to install the dependencies.
  - Run `npm start` for development.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/index.ts`. The page auto-updates as you edit the file.

## 🔧 Environment Variables

By default all environment variables loaded through `.env` are only available in the Node.js environment, meaning they won't be exposed to the browser.

In order to expose a variable to the browser you have to prefix the variable with `REACT_APP_.`
