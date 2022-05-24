class SuccessResponse {
  constructor({ msg, data }) {
    this.success = true;
    this.msg = msg;
    this.data = data;
  }
}

module.exports = SuccessResponse;
