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
    });
  }
  mainClass(){
    return this.prompt(
      {
        name: 'mainClass',
        message: 'Your leaflet plugin main class',
        default: _.capitalize(this.props.name.replace("leaflet","").replace(/\W/,"")),
        transformer: str => {
          return _.capitalize(str).replace(/\W/,"")
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
      default: true
    }).then(props => {
      Object.assign(this.props, props);
    })
  }
 
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your plugin must be inside a folder named ${
        this.props.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    // const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    // https://github.com/yeoman/generator-node/blob/master/generators/app/index.js
    this.composeWith(require.resolve('./base.js'), {
      boilerplate: false,
      name: this.props.name,
      coveralls: false,
      git:false
      // readme: readmeTpl({
      //   generatorName: this.props.name,
      //   yoName: this.props.name.replace('generator-', '')
      // })
    });
  }
  _writePackageJson() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkgTpl = _.template(this.fs.read(this.templatePath('package.json')));
    const base = JSON.parse(pkgTpl(this.props))
    extend(pkg, base);
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('yeoman-generator')
    pkg.keywords = _.uniq(pkg.keywords);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  writing() {
    this._writePackageJson()
    const rollupTpl = _.template(this.fs.read(this.templatePath('rollup.config.js')));
    this.fs.write(this.destinationPath('rollup.config.js'),rollupTpl(this.props))
  }

  install() {
    var pm = { bower: false,npm:false,yarn:false }
    pm[this.props.packageManager] = true
    this.installDependencies(pm);
  }
};
