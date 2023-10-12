import { describe, expect, it } from 'vitest';
import Regex from '../Regex';

describe('Regex', () => {
   it('Regex email trả về true nếu là email', () => {
      expect(Regex.email.test('duongcoi1803@gmail.com.vn')).toBe(true);
      expect(Regex.email.test('duongcoi1803@gmail.c')).toBe(false);
   });
   it('Regex className trả về true nếu là tên lớp gồm 1 chữ trước và 1 số sau', () => {
      expect(Regex.className.test('2b')).toBe(true);
      expect(Regex.className.test('2b1')).toBe(false);
      expect(Regex.className.test('b1')).toBe(false);
   });
   it('Regex number trả về true nếu là số dương', () => {
      expect(Regex.number.test(1222)).toBe(true);
      expect(Regex.number.test(-1222)).toBe(false);
      expect(Regex.number.test('1222')).toBe(true);
   });
   it('Regex phone trả về true nếu là điện thoại bắt đầu băng 84 hoặc 0[3|5|7|8|9] và có 10 số', () => {
      const phoneNumber = '0982967640';
      expect(phoneNumber).toBeTypeOf('string');
      expect(Regex.phone.test(phoneNumber)).toBe(true);
      expect(Regex.phone.test(parseInt(phoneNumber))).toBe(false);
   });
});
