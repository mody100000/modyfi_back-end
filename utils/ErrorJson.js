class ErrorJson extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }
}
module.exports = ErrorJson;
