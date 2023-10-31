import { describe, expect, it, test } from 'vitest';
import toFormatMoney from '../Price';

describe('Price', () => {
   it('Price trả về một format money', () => {
      const price = '10000';
      // test xem price có thể là số hoặc number
      expect(price).toBeTypeOf('string', 'number');
      // test return type
      expect(toFormatMoney(price)).toBeTypeOf('string');
   });
   // test kết quả trả về
   test('format 0 to 0đ', () => {
      expect(toFormatMoney(0)).toBe('0đ');
   });
   test('format string 1000 to 1.000đ', () => {
      expect(toFormatMoney('1000')).toBe('1.000đ');
   });
   test('format 1000000 to 1.000.000đ', () => {
      expect(toFormatMoney(1000000)).toBe('1.000.000đ');
   });
});
