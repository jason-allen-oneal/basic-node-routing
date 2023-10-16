const fs = require('fs');
const fsPromises = fs.promises;
const path = require("path");
const { URL } = require("url");
const { RouterError, InvalidURLError, PageNotFoundError } = require("./error_handler");
const hb = require("handlebars");

const Router = {
  url: "",
  host: "",
  path: "",
  filePath: "",
  params: {},
  request: function(req) {
    this.host = req.headers.host;
    this.url = req.url;
    this.validateURL();
    
    let file = this.path;
    
    if(this.path == "/") {
      file = "index";
    }
    
    const filePath = path.resolve(`src/pages/${file}.js`);
    
    try {
      fsPromises.access(filePath, fs.constants.W_OK);
      
      const page = require(filePath);
      
      page.prerender();
      const html = page.view();
      return html;
    } catch(e) {
      if(e instanceof PageNotFoundError) {
        throw new PageNotFoundError(this.path);
      } else {
        throw new RouterError("Something went wrong: " + e);
      }
    }
  },
  validateURL: function() {
    try {
      const urlData = new URL(`http://${this.host}${this.url}`);
      this.path = urlData.pathname;
      this.params = urlData.searchParams;
    } catch (e) {
      throw new InvalidURLError(this.url);
      return;
    }
  },
  render: function(res, content, pageTitle = null) {
    const template = fs.readFileSync('templates/base.hbhtml', 'utf8');
    const compiled = hb.compile(template);
    const html = compiled({
      pageTitle: (pageTitle) ? "Basic Routing " + pageTitle : "Basic Routing",
      content: content,
    });
    
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  }
};

module.exports = Router;