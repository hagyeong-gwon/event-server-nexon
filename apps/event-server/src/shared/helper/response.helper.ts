import { ResponseDto } from '../dto/response.dto';

export function successResponse<T>(
  data: T,
  message = '요청이 성공적으로 처리되었습니다.',
): ResponseDto<T> {
  return new ResponseDto({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  message = '요청 처리 중 오류가 발생했습니다.',
  errorCode?: string,
): ResponseDto<null> {
  return new ResponseDto({
    success: false,
    message,
    errorCode,
    data: null,
  });
}
