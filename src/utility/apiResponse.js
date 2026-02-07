class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.status = statusCode < 400 ? "success" : "fail";
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
