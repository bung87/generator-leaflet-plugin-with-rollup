'use strict';
const Generator = require('yeoman-generator');
// const chalk = require('chalk');
// const yosay = require('yosay');
const path = require('path');
const inquirer = require('inquirer');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('leaflet-') === 0 ? name : 'leaflet-' + name;
  return name;
}
// https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md
// /src        - JS source files
// /dist       - minified plugin JS, CSS, images
// /spec       - test files
// /lib        - any external libraries/plugins if necessary
// /examples   - HTML examples of plugin usage
// README.md
// LICENSE
// package.json


module.exports = class extends Generator {

  initializing() {
    this.props = {};
  }
  packageName() {

    return askName(
      {
        name: 'name',
        message: 'Your leaflet plugin name',
        default: makeGeneratorName(path.basename(process.cwd())),
        filter: makeGeneratorName,
        validate: str => {
          return str.length > 'leaflet-'.length;
        }
      },
      this
    ).then(props => {
      Object.assign(this.props, props);
      if (path.basename(this.destinationPath()) !== this.props.name) {
        this.log(
          `Your plugin must be inside a folder named ${
          this.props.name
          }\nI'll automatically create this folder.`
        );
        mkdirp(this.props.name);
        this.destinationRoot(this.destinationPath(this.props.name));
      }
    });
  }
  mainClass() {
    return this.prompt(
      {
        name: 'mainClass',
        message: 'Your leaflet plugin main class',
        default: _.capitalize(this.props.name.replace("leaflet", "").replace(/\W/, "")),
        transformer: str => {
          return _.capitalize(str).replace(/\W/, "")
        }
      },
      this
    ).then(props => {
      Object.assign(this.props, props);
    });
  }
  baseClass() {
    const choices = Array.prototype.concat.call(["none"], [
      //base type
      new inquirer.Separator(),
      "Icon", "DivIcon"
    ],
      [ //base class
        new inquirer.Separator(),
        "Layer", "Control", "Handler", "Projection", "CRS", "Renderer"
      ],
      [ // ui layer
        "Marker", "Popup", "Tooltip"
      ],
      [ //raster layer
        new inquirer.Separator(),
        "TileLayer", "TileLayer.WMS", "ImageOverlay", "VideoOverlay"
      ],
      [ //vector layer
        new inquirer.Separator(),
        "Path", "Polyline", "Polygon", "Rectangle", "Circle", "SVGOverlay", "SVG", "Canvas"
      ]);
    return this.prompt({
      type: "rawlist",
      name: "baseClass",
      message: 'Your leaflet plugin base class',
      choices
      ,
      default: false
    }).then(props => {
      Object.assign(this.props, props);
    })
  }
  packageManager() {
    return this.prompt({
      type: "list",
      name: "packageManager",
      message: 'Your favorite package manager',
      choices: ["yarn", "npm"],//, "pnpm"],
      store: true,
      default: true
    }).then(props => {
      Object.assign(this.props, props);
    })
  }

  default() {

    this._writePackageJson()
    const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    // https://github.com/yeoman/generator-node/blob/master/generators/app/index.js
    this.composeWith(require.resolve('generator-node/generators/app'), {
      // generateInto:this.destinationRoot(),
      boilerplate: false,
      name: this.props.name,
      coveralls: false,
      git: false,
      travis: true,
      skipInstall: true,
      skipMessage: true,
      readme: readmeTpl({
        name: this.props.name,
        description: this.props.description,
        mainClass: this.props.mainClass,
        license: this.props.license
      })
    });
  }
  _writePackageJson() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkgTpl = _.template(this.fs.read(this.templatePath('package.json')));
    const base = JSON.parse(pkgTpl(this.props))
    extend(pkg, _.omit(base, ["devDependencies", "peer-dependencies", "dependencies"]));
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('leaflet-plugin')
    pkg.keywords = _.uniq(pkg.keywords);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  writing() {

    const rollupTpl = _.template(this.fs.read(this.templatePath('rollup.config.js')));
    this.fs.write(this.destinationPath('rollup.config.js'), rollupTpl(this.props))
    const testTpl = _.template(this.fs.read(this.templatePath(["spec", "test.test.js"].join(path.sep))));
    this.fs.write(this.destinationPath(["spec", `${this.props.mainClass.toLowerCase()}.test.js`].join(path.sep)), testTpl(this.props))
    const otherFiles = [
      ["src", "index.js"],
      ["src", "bundle.js"],
      ["src", "style.scss"],
      ["examples", "index.html"],
      ["examples", "index.js"],
      ["tools", "gh-pages-publish.js"],
      [".gitignore"]
    ]
    otherFiles.forEach(paths => {
      const tpl = _.template(this.fs.read(this.templatePath(paths.join(path.sep))));
      this.fs.write(this.destinationPath(paths.join(path.sep)), tpl(this.props))
    })
  }

  install() {
    // var pm = { bower: false,npm:false,yarn:false }
    // pm[this.props.packageManager] = true
    // this.installDependencies(pm);
    const pkg = this.fs.readJSON(this.templatePath('package.json'));
    // const peerDependenciesMap = new Map()
    // for (let k in pkg["peer-dependencies"]){
    //   peerDependenciesMap.set(k, pkg["peer-dependencies"][k]) 
    // }
    // const peerDependencies = []
    // peerDependenciesMap.forEach( (v,k) => {
    //   peerDependencies.push(`${k}@${v}`)
    // })
    const peerDependencies = Object.keys(pkg["peer-dependencies"])
    const devDependencies = Object.keys(pkg["devDependencies"]).concat("https://github.com/bung87/postcss-sprites/archive/v4.2.1b.tar.gz")
    if (this.props.packageManager === "yarn") {
      // this.yarnInstall(peerDependencies,{ 'save': false },{cwd:this.destinationRoot()})
      this.yarnInstall(peerDependencies, { silent: true, "save-peer": true, prod: true }, { cwd: this.destinationRoot() })
      this.yarnInstall(devDependencies, { silent: false, "save-dev": true, dev: true }, { cwd: this.destinationRoot() })
    } else if (this.props.packageManager === "npm") {

      this.npmInstall(peerDependencies, { 'save-peer': true, prod: true }, { cwd: this.destinationRoot() })
      this.npmInstall(devDependencies, { 'save-dev': true, dev: true }, { cwd: this.destinationRoot() })
    }

  }

};
