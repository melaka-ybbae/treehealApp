/**
 * 전화번호 포맷팅 (010-1234-5678)
 */
export const formatPhoneNumber = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 최대 11자리까지만
  const trimmed = numbers.slice(0, 11);

  // 포맷 적용
  if (trimmed.length <= 3) {
    return trimmed;
  } else if (trimmed.length <= 7) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
  } else {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
  }
};

/**
 * 생년월일 포맷팅 (YYYY-MM-DD)
 */
export const formatBirthDate = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, '');

  // 최대 8자리까지만 (YYYYMMDD)
  const trimmed = numbers.slice(0, 8);

  // 포맷 적용
  if (trimmed.length <= 4) {
    return trimmed;
  } else if (trimmed.length <= 6) {
    return `${trimmed.slice(0, 4)}-${trimmed.slice(4)}`;
  } else {
    return `${trimmed.slice(0, 4)}-${trimmed.slice(4, 6)}-${trimmed.slice(6)}`;
  }
};

/**
 * 전화번호 유효성 검사
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  const numbers = phone.replace(/[^\d]/g, '');
  // 10자리 또는 11자리
  return numbers.length === 10 || numbers.length === 11;
};

/**
 * 생년월일 유효성 검사
 */
export const isValidBirthDate = (birthdate: string): boolean => {
  if (!birthdate) return false;
  const numbers = birthdate.replace(/[^\d]/g, '');

  // 8자리인지 확인
  if (numbers.length !== 8) {
    return false;
  }

  const year = parseInt(numbers.slice(0, 4), 10);
  const month = parseInt(numbers.slice(4, 6), 10);
  const day = parseInt(numbers.slice(6, 8), 10);

  // 연도 범위 확인 (1900 ~ 현재 연도)
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return false;
  }

  // 월 범위 확인 (1~12)
  if (month < 1 || month > 12) {
    return false;
  }

  // 일 범위 확인 (1~31)
  if (day < 1 || day > 31) {
    return false;
  }

  // 실제 날짜 유효성 확인
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
