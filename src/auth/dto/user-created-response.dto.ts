import { BaseResponseDto } from "../../base/dto/base-response.dto";

export class UserCreatedResponseDto extends BaseResponseDto {
  constructor(message: string = 'User created successfully') {
    super(201);
    this.message = message;
  }
  message: string;
}