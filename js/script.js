
function calculator(str) {



const checkNumber = (str) => {
    if (+str > 10 || +str <= 0) return false;
    return +str;
  }

  const transformRomantoArabic = (str) => {
    if (str[0] === '-') return 'neg';
    if (str === 'I') {
      return 1;
    } else if (str === 'II') {
      return 2;
    } else if (str === 'III') {
      return 3;
    } else if (str === 'IV') {
      return 4;
    } else if (str === 'V') {
      return 5;
    } else if (str === 'VI') {
      return 6;
    } else if (str === 'VII') {
      return 7;
    } else if (str === 'VIII') {
      return 8;
    } else if (str === 'IX') {
      return 9;
    } else if (str === 'X') {
      return 10;
    } else {
      return 'other'
    }
  }

  const calc = {
    '+': (a,b) => +parseInt(a+b).toFixed(2),
    '-': (a,b) => +parseInt(a-b).toFixed(2),
    '*': (a,b) => +parseInt(a*b).toFixed(2),
    '/': (a,b) => +a === 0 || +b === 0 ? 0 : +parseInt(a/b)
  }

  const parseString = (dirtyString) => {
    const tmpArray = Array(3).fill('');                               // creating array to store values
    let arabic = false, roman = false;
    const arr = Array.from(dirtyString.replace(/\s*/g, ''));          // clear from spaces
    const idx = arr.findIndex((_,i) => i !== 0 && /[-+*/]/.test(_));  // find operator [-+*/] value
    if (idx === -1) {
      return null;
    } else {
      tmpArray[1] = arr[idx];
    }

    //  before operator
    for (let i = 0; i < idx; i++) {
      tmpArray[0] += arr[i];
      if (/[0-9]/.test(arr[i])) {
        arabic = true;
      } else if (/[XVI]/.test(arr[i])) {
        roman = true;
      }
    }

    //  after operator
    for (let i = idx + 1; i < arr.length; i++) {
      tmpArray[2] += arr[i];
      if (/[0-9]/.test(arr[i])) {
        arabic = true;
      } else if (/[XVI]/.test(arr[i])) {
        roman = true;
      }
    }

    // tmpArray = ['III', '+', 'X']


    // here check operands
    if (arabic && roman) {
      return {result: false, type: null, tmpArr: null};
    } else if (arabic) {
      return {result: true, type: 'arabic', tmpArr: tmpArray};
    } else {
      return {result: true, type: 'roman', tmpArr: tmpArray};
    }
  }

  const calcArabic = (array) => {
    const oper1 = checkNumber(array.tmpArr[0]);
    const oper2 = checkNumber(array.tmpArr[2]);
    if (oper1 === false || oper2 === false) {
      console.error(`Use numbers from 1 to 10`);
      return null;
    } else {
      return calc[array.tmpArr[1]](oper1, oper2);
    }
  }

  const calcRoman = (array) => {
    const oper1 = transformRomantoArabic(array.tmpArr[0]);
    const oper2 = transformRomantoArabic(array.tmpArr[2]);
    if (oper1 === 'neg' || oper2 === 'neg') {
      console.error(`You don't use negative number in roman numbers`);
      return null;
    } else if (oper1 === 'other' || oper2 === 'other') {
      console.error(`Use numbers from 1 to 10`);
      return null;
    } else {
      const result = calc[array.tmpArr[1]](oper1, oper2);
      return result <= 0 ? '' : result;
    }
  }

  const calculate = (str) => {
    const array = parseString(str);

    if (array === null) {
      console.error('Unknown error!');
      return null;
    } else if (array.result === false) {
      console.error('You must be use only arabic or roman numbers!');
      return null;
    } else if (array.type === 'arabic') {
      return calcArabic(array);
    } else if (array.type === 'roman') {
      return calcRoman(array);
    }
  }


  const string = 'III + X';
  const result = calculate(string);
  console.log(result);
}
