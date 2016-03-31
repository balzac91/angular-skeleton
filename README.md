# Angular Skeleton

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Simple [AngularJS] (https://angularjs.org/) template for web apps. It contains all necessary tools you need to build and maintain web application based on Angular 1.x. [Gulp] (http://gulpjs.com/) provides easy way to automate popular tasks such as less compilation, minifying scripts and styles etc. All app dependencies are installed with [Bower] (http://bower.io/).  

This skeleton uses the following libraries and frameworks:
* [AngularJS] (https://angularjs.org/)
* [AngularUI Router] (https://github.com/angular-ui/ui-router)
* [Bootstrap] (http://getbootstrap.com/)
* [UI Bootstrap] (https://angular-ui.github.io/bootstrap/)
* [Font Awesome] (https://fortawesome.github.io/Font-Awesome/)

## Application structure
```
app/
  assets/
    fonts/                      - all custom fonts should be stored here
    images/                     - directory for all images
  bower_components/
  components/                   - reusable components
    menu/
      menu.directive.js         - example of menu component
      menu.html
  css/                          - all less files should be stored here
    app.less                    - main less file which imports others less
  filters/                      - directory for filters
  pages/                        - all pages should be stored here
    page-one/
      page-one.controller.js    - exemplary page controller
      page-one.html
    page-two/
      page-two.controller.js
      page-two.html
  services                      - directory for services
    log.service.js              - exemplary service
  app.css                       - compiled css
  app.js                        - main app file
  app.routes.js                 - main routes file
  index.html
```

## Getting started
* Download or clone this repository
* Install dependencies with `npm install` - it automatically runs `bower install`

After installation you can start to develop the application. Just run `npm run serve` or `gulp serve` to start development server. It compiles less into css file and lints JS files using [ESLint] (http://eslint.org/).
To build minified app call `npm run build` or `gulp build`. It creates dist directory containing all the files needed for your application.