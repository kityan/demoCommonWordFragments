const lib = require('../lib/').words;

describe('words', function () {

  it('should correctly get diagonals from matrix', function () {
    let arr = [];

    arr[0] = {
      input: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
      result: [
        [13],
        [9, 14],
        [5, 10, 15],
        [1, 6, 11, 16],
        [2, 7, 12],
        [3, 8],
        [4]
      ]
    };

    arr[1] = {
      input: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      result: [
        [5],
        [1, 6],
        [2, 7],
        [3, 8],
        [4]
      ]
    };

    arr[2] = {
      input: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
      result: [
        [7],
        [5, 8],
        [3, 6],
        [1, 4],
        [2]
      ]
    };

    arr[3] = {
      input: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15],
      ],
      result: [
        [13],
        [10, 14],
        [7, 11, 15],
        [4, 8, 12],
        [1, 5, 9],
        [2, 6],
        [3]
      ]
    };


    arr.forEach((el) => {
      expect(lib.matrixToDiagonals(el.input)).to.eql(el.result);
    });

  });


  it('should correctly find all common fragments for two given words', function () {
    let arr = [];

    arr[0] = { input: ['apple', 'plant'], result: ['a', 'p', 'pl'] };
    arr[1] = { input: ['appl', 'plant'], result: ['a', 'p', 'pl'] };

    arr.forEach((el) => {
      expect(lib.getCommonFragment(el.input[0], el.input[1])).to.eql(el.result);
    });

  });


  it('should correctly find the longest common fragment for given words', function () {
    let arr = [];

    arr[0] = {
      input:
        [
          'apple',
          'plant',
          'application'
        ],
      result: ['pl']
    };


    arr.forEach((el) => {
      expect(lib.getTheLongestCommonFragment(el.input, true)).to.eql(el.result);
    });
  });

  it('should throw error on invalid input', function () {

    let arr = [
      12,
      'test',
      { word1: 'word1' },
      ['a', 'b', 1],
      ['a', 'b', ''],
      [],
      ['aaa']
    ];

    arr.forEach((el) => {
      expect(() => lib.getTheLongestCommonFragment(el))
        .throw(Error).that.has
        .property('message').that
        .equal('Invalid input format');
    });

  });










});
