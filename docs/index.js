//Ahora creamos un archivo index.js que exportará todos los archivos que vamos a ir creando en la carpeta docs:
//  importaremos los diferentes archivos y los exportaremos

const basicInfo = require("./basicInfo");
const products = require("./products");
const components = require("./components");

module.exports = {
    ...basicInfo,//SWAGGER 2 
    ...products, //SWAGGER 8
    ...components  //SWAGGER 5
};


//...spread operator lo que hace es hacer una copia sin tocar el original