# photography
Simple react app that renders collections of images.  Also serves as a simple introduction to developing client-side apps with Node, NPM, Webpack, React, and Bootstrap.

## Installing, building, and running

This project use NPM to manage the installation, building, and running of this application.  In order to use this project you will need to become familiar with these concepts.

Running `npm install` will install the dependencies listed in `package.json`.  This **must** be done before doing anything else in this project, since the dependencies provide many of the features required by this project.  `npm install` is one of the built-in commands in NPM.

Running `npm test` will run all the unit tests in the `test/` directory.  This should be run regularly during development to ensure that no existing features are accidentally regressed.  In fact, the imperatives of test-driven develop require that tests be run as often as possible.  `npm test` is one of the built-in commands NPM but is redefined in `package.json` to run Mocha tests.  Mocha is a simple testing framework for Node.

Running `npm run build` will run `npm test` automatically and then call to Webpack, a tool that bundles together Javascript, CSS, and other resources and produces a "dist" bundle in the `dist/` directory.  This bundle is suitable for use in a webpage like a typical JavaScript file.  `npm build` is a command defined in `package.json`.

Running `npm run webpack` calls to Webpack, which will bundle together JavaScript and various other resources into a file suitable for use in the browser. `npm run webpack` is a command defined in `package.json`.

#### Other commands

`npm run bump` defers to `npm run bump:patch`.

`npm run bump:patch` will defer to `npm version` to bump the patch version number in `package.json` and create a tag that can be pushed to github.

`node ./server.js` will start an example server at `http://localhost:9320`.

## The build process explained

Running `npm run build` will invoke Webpack.  What follows is a rough, high-leel explanation of what Webpack does.
 
Webpack will start by looking at the `./index.js` file.  Inside `./index.js` is an import statement for `./src/nouns-and-verbs.js`.  Webpack then continues to look for imports until it can no longer find any.  At that point it will take files with React code and pass them through Babel.  Babel is a tool that can take the React code, which looks like HTML/XML, and convert it to standard JavaScript.  

Once it finishes converting React code, it will also convert SCSS into valid CSS files.  Finally, it takes all the finalized JavaScript, CSS, and JSON code and compiles it all into a single file, naming it `application.js` and placing it in the `dist/` directory.

It also takes the `application.js` file and minimizes its contents, producing a file named `application.min.js` and placing it next to `application.js` in the `dist/` directory.  The "minified" file is what is used on iowalight.com; the non-minified file is used for development.
