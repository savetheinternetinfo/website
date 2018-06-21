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

[http://best-universe.de](http://best-universe.de)

<hr>

## :wrench: Used technologies / Libraries / Frameworks

**Frontend**:

- [JQuery 3.3.1](https://jquery.com/)
- [Tailwind CSS](https://tailwindcss.com/)

**Backend**:

- [NodeJS v8.11.2](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJS v4.16.3](https://expressjs.com/)
- [EJS v2.6.1](http://ejs.co/)
- [server favicon v2.5.0](https://www.npmjs.com/package/serve-favicon)
- [i18n v0.8.3](https://www.npmjs.com/package/i18n)
- [cookie-parser v1.4.3](https://www.npmjs.com/package/cookie-parser)

<hr>

## :chart_with_upwards_trend: Local testing

This site is written in NodeJS and was built on top of the ExpressJS Framework. <br>
Current deployment platform specifications:

- NodeJS Version: v8.11.1
- Operating System: Ubuntu 16.04.4 LTS
- Architecture: x86_64

**NodeJS Dependencies**:

| package name  | used version |
| ------------- | ------------ |
| ExpressJS     | 4.16.3       |
| EJS           | 2.6.1        |
| serve-favicon | 2.5.0        |
| i18n          | 0.8.3        |
| cookie-parser | 1.4.3        |

**Installation & Quick setup:**

0. Open up your favourite terminal (and navigate somewhere you want to download the repository to) <br><br>
1. Make sure you have nodejs installed. Test by  entering <br>
$ `node -v` <br>
If this returns a version number, NodeJS is installed. **If not**, get NodeJS <a href="https://nodejs.org/en/download/package-manager/">here</a>. <br><br>
2. Clone the repository and navigate to it. <br>
$ `git clone https://github.com/savetheinternetinfo/website.git && cd website` <br><br>
3. Run the post setup script to install typescript: <br>
$ `npm run postsetup` <br><br>
4. Install all dependencies by typing <br>
$ `npm install`<br><br>

**Testing & Building:**

Build and run a local instance: <br>
$ `npm test`

Build only:<br>
$ `npm run build`

Start only:<br>
$ `npm start`

Run file watcher for automatic builds:<br>
$ `npm run watch`

**Info:**

Per default, the server runs on port 3000 (http://localhost:3000). <br>
This can be customized in the [`config.ts`](https://github.com/savetheinternetinfo/website/blob/master/src/config.ts) file. 

<hr>

## Roadmap

- //TODO

<hr>
