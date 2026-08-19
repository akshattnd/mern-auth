export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly data: T;
  public readonly statusCode: number;
  public readonly message: string = "success";
  constructor(statusCode: number, data: T, message: string = "success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
