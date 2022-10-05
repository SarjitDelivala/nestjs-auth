export class BaseResponseDto {
  constructor(statusCode: number = 200) {
    this.statusCode = statusCode;
  }

  statusCode: number;
}