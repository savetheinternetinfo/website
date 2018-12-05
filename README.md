# SaveTheInternet

<p align="center">
<img height="150" width="auto" src="https://i.imgur.com/SXC70FD.png" /><br>
Save the Internet with us
</p>

<hr>

## :pushpin: About

On 20 June, the European Parliament will vote on the Copyright Directive. <br>
Members of the parliament are the only ones that can stand in the way of bad copyright legislation.

**Note:** This is a NodeJS revamp of the [old website](https://github.com/Insax/savetheinternet)

<hr>

## :computer: Website

**Deployment:**

[https://savetheinternet.info](https://savetheinternet.info)

**Staging (dev branch):**

[https://dev.savetheinternet.info/](https://dev.savetheinternet.info/)

<hr>

## :wrench: Used technologies / Libraries / Frameworks

**Frontend**:

| Name | Version |
| ---- | :-----: |
| [JQuery](https://jquery.com/)                               | 3.3.1  |
| [Tailwind CSS](https://tailwindcss.com/)                    | 0.6.1  |
| [flag-icon-css](http://flag-icon-css.lip.is/)               | 4.7.0  |
| [cssnano](https://cssnano.co/)                              | 3.10.0 |
| [font-awesome](https://fontawesome.com/)                    | 4.7.0  |
| [masonry-layout](https://masonry.desandro.com/)             | 4.2.1  |
| [simplelightbox](http://dbrekalo.github.io/simpleLightbox/) | 1.13.0 |
| [typed.js](https://mattboldt.com/typed.js/)                 | 2.0.8  |

**Backend (NodeJS Dependencies)**:

| Name  | Version |
| ----- | :-----: |
| [NodeJS](https://nodejs.org/)                                                  | 8.11.2 |
| [TypeScript](https://www.typescriptlang.org/)                                  | 2.9.2  |
| [ExpressJS](https://expressjs.com/)                                            | 4.16.3 |
| [EJS](http://ejs.co/)                                                          | 2.6.1  |
| [server-favicon](https://www.npmjs.com/package/serve-favicon)                  | 2.5.0  |
| [i18n](https://www.npmjs.com/package/i18n)                                     | 0.8.3  |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser)                   | 1.4.3  |
| [laravel-mix](https://www.npmjs.com/package/laravel-mix)                       | 2.1.11 |
| [tslint](https://palantir.github.io/tslint/)                                   | 5.10.0 |
| [ts-loader](https://www.npmjs.com/package/ts-loader)                           | 3.5.0  |
| [body-parser](https://www.npmjs.com/package/body-parser)                       | 1.18.3 |
| [cross-env](https://www.npmjs.com/package/cross-env)                           | 5.2.0  |
| [dotenv](https://www.npmjs.com/package/cross-env)                              | 6.0.0  |
| [node-cache](http://mpneuried.github.io/nodecache/)                            | 4.2.0  |
| [express-github-webhook](https://www.npmjs.com/package/express-github-webhook) | 1.0.6  |
| [fs-extra](https://www.npmjs.com/package/fs-extra)                             | 6.0.1  |
| [moment](http://momentjs.com/)                                                 | 2.22.2 |
| [sharp](https://www.npmjs.com/package/sharp)                                   | 0.20.4 |
| [winston](https://www.npmjs.com/package/winston)                               | 3.0.0  |

<hr>

## :chart_with_upwards_trend: Local testing

This site is written in NodeJS and was built on top of the ExpressJS Framework. <br>
Current deployment platform specifications:

- NodeJS Version: v8.11.1
- Operating System: Ubuntu 16.04.4 LTS
- Architecture: x86_64

**Installation & Quick setup:**

0. Open up your favorite terminal (and navigate somewhere you want to download the repository to) <br><br>
1. Make sure you have nodejs installed. Test by  entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it. <br>
$ `git clone https://github.com/savetheinternetinfo/website.git && cd website` <br><br>
3. Run the post setup script to install typescript: <br>
$ `npm run postsetup` <br><br>
4. Install all dependencies by typing <br>
$ `npm install`<br><br>
5. Compile the assets <br>
$ `npm run assets-dev`<br><br>
6. Fill in your config secrets<br>
$ `cp .env.dist .env`<br><br>
And fill that file<br><br>
7. Start the server <br>
$ `npm run dev`<br><br>

Or use Docker:<br>
1. Install Docker and docker-compose
2. Clone the repository and navigate to it. <br>
$ `git clone https://github.com/savetheinternetinfo/website.git && cd website` <br><br>
3. Then run `docker-compose run --rm npm i && npm run build` this builds the container and the sources <br>
4. After that run `docker-compose up` this starts the docker container with the compiled sources <br><br>

**Developing & Building:**

Build and run a local instance: <br>
$ `npm run dev`

Build only:<br>
$ `npm run build`

Start only:<br>
$ `npm start`

Run TypeScript linter<br>
$ `npm run lint`

Run file watcher for automatic builds:<br>
$ `npm run watch`

**Info:**

Per default, the server runs on port 3000 (http://localhost:3000). <br>
This can be customized in the [`config.ts`](https://github.com/savetheinternetinfo/website/blob/master/src/config.ts) file.

<hr>
