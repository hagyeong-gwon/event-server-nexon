export class ResponseDto<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;

  constructor(params: {
    success: boolean;
    message: string;
    data?: T;
    errorCode?: string;
  }) {
    this.success = params.success;
    this.message = params.message;
    this.data = params.data;
    this.errorCode = params.errorCode;
  }
}
