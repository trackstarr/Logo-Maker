const fs = require('fs');
const inquirer = require('inquirer');
const svg = require('svg');
// const open = require('open');

class Logo{
  constructor (shape='', text='',textColor='', shapeColor=''){
    this.text=text
    this.textColor=textColor
    this.shape=shape
    this.shapeColor=shapeColor

  }
getText () {
  return this.text
}
setText (text){
this.text=text
}
getTextColor () {
  return this.textColor
}
setTextColor (textColor){
this.textColor=textColor
}
getShape () {
  return this.shape
}
setShape (shape){
this.shape=shape
}
getShapeColor () {
  return this.shapeColor
}
setShapeColor (shapeColor){
this.shapeColor=shapeColor
}
generateSVGText (){
   return `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${this.getTextColor()}" font-size="185" font-weight="900">${this.getText()}</text>`
    
}
generateSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="400" height="400">${this.render()}${this.generateSVGText()} </svg>`
}
};
class Circle extends Logo{
  constructor (text,textColor,shapeColor) {
    super ('Circle',text,textColor,shapeColor)
  }
  
  render (){
    return `<circle cx="200" cy="200" r="200" fill="${this.getShapeColor()}"/>`

  }
}
class Square extends Logo{
  constructor (text,textColor,shapeColor) {
    super ('Square',text,textColor,shapeColor)
  }
  render (){
    return `<rect width="400" height="400" fill="${this.getShapeColor()}"/>`
  }
}

class Triangle extends Logo{
  constructor (text,textColor,shapeColor) {
    super ('Triangle',text,textColor,shapeColor)
  }
  render () {
    return `<polygon points="200,0  400,400 0,400" fill="${this.getShapeColor()}"/>`
  }
}


class LogoGenerator {
  constructor() {
    this.text = '';
    this.textColor = '';
    this.shape = '';
    this.shapeColor = '';
  }

  async promptForText() {
    const response = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    });
    this.text = response.text;
  }

  async promptForTextColor() {
    const response = await inquirer.prompt({
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal):',
    });
    this.textColor = response.textColor;
  }

  async promptForShape() {
    const response = await inquirer.prompt({
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    });
    this.shape = response.shape;
  }

  async promptForShapeColor() {
    const response = await inquirer.prompt({
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal):',
    });
    this.shapeColor = response.shapeColor;
  }

  generateLogo() {
    let logo;
    if (this.shape=="circle") {
      logo=new Circle();
      
    }
    else if (this.shape=="square") {
      logo=new Square();
    }
    else if (this.shape=="triangle") {
      logo=new Triangle();

    }

    logo.setText(this.text);
    logo.setTextColor(this.textColor)
    logo.setShapeColor(this.shapeColor);
    
    console.log (logo.generateSVG());
    fs.writeFileSync(`${logo.getShape()}.svg`, logo.generateSVG());
    // console.log('Generated logo.svg');
  }

  // async openInBrowser() {
  //   await open('logo.svg');
  // }

  async run() {
    await this.promptForText();
    await this.promptForTextColor();
    await this.promptForShape();
    await this.promptForShapeColor();
    this.generateLogo(); 
    // await this.openInBrowser();
  }
}

const logoGenerator = new LogoGenerator();
logoGenerator.run();

