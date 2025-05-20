import * as dayjs from 'dayjs';

/**
 * 한국 시간(KST) 기준의 현재 시간을 Date 객체로 반환
 */
export function nowKST(): Date {
  return dayjs().tz('Asia/Seoul').toDate();
}

/**
 * 한국 시간(KST) 기준의 현재 시간을 ISO 문자열로 반환
 */
export function nowKSTString(): string {
  return dayjs().tz('Asia/Seoul').format();
}

/**
 * 날짜를 KST로 변환한 dayjs 객체로 반환
 * @param date Date or string
 */
export function toKSTString(date: Date | string): string {
  return dayjs(date).tz('Asia/Seoul').toISOString();
}
