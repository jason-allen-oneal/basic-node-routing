class 	RouterError extends Error {
  constructor(message) {
    super(message);
    this.name = "RouterError";
  }
}

class InvalidURLError extends RouterError {
  constructor(url) {
    super("URL is invalid: " + url);
    this.name ="InvalidURLError";
  }
}

class PageNotFoundError extends RouterError {
  constructor(page) {
    super("Page not found: " + page);
    this.name = "PageNotFoundError";
  }
}

module.exports = {RouterError, InvalidURLError, PageNotFoundError};