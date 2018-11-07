import { splitNumberOnKiloUtil } from './splitNumberOnKiloUtil';


describe('splitNumberOnKiloUtil', () => {
  it('1 => 1', () => {
    const number = 1
    const expectedNumber = '1 ';
    const recievedTax = splitNumberOnKiloUtil(number);

    expect(recievedTax).toEqual(expectedNumber);
  })
  it('1000 => 1 000', () => {
    const number = 1000
    const expectedNumber = '1 000 ';
    const recievedTax = splitNumberOnKiloUtil(number);

    expect(recievedTax).toEqual(expectedNumber);
  })
  it('1000000 => 1 000 000', () => {
    const number = 1000000
    const expectedNumber = '1 000 000 ';
    const recievedTax = splitNumberOnKiloUtil(number);

    expect(recievedTax).toEqual(expectedNumber);
  })
})
