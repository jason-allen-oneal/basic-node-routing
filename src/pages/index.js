module.exports = {
  prerender: function() {
    this.string = "world";
  },
  view: function() {
    return `<h1>Hello, ${this.string}!</h1>`;
  }
}; 
