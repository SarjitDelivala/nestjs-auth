import { BaseResponseDto } from "../../base/dto/base-response.dto";

export class AuthResponseDto extends BaseResponseDto{
  accessToken: string;
}