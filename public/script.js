/*--------------------------Hamburger nav--------------------------------*/
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<html><body><div class="hamburger">Menu</div></body></html>`);
const document = dom.window.document;

const hamburger1 = document.getElementsByClassName('hamburger');
console.log(hamburger1); // This should now work in Node.js

  
