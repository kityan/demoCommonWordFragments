/**
 * @module Words
 */

/**
 * Get all common fragments for two words
 * @param {string} w1
 * @param {string} w2
 * @private
 * @returns {string[]} sorted (alphabetically ascending) array of common fragments
 */
function getCommonFragment(w1, w2) {
  let
    l1 = w1.length,
    l2 = w2.length,
    matrix = [],
    fragments = new Set()
    ;

  for (let i = 0; i < l1; i++) {
    matrix[i] = [];
    for (let j = 0; j < l2; j++) {
      matrix[i][j] = (w1[i] === w2[j]) ? w1[i] : null;
    }
  }

  let diags = matrixToDiagonals(matrix);

  for (let i = 0, qty = diags.length; i < qty; i++) {
    let str = '';
    for (let j = 0, qty = diags[i].length; j < qty; j++) {
      if (diags[i][j] === null) {
        // interrupted diagonal
        if (str.length) {
          fragments.add(str);
          str = '';
        }
      } else {
        str += diags[i][j];
      }
    }
    // full diagonal
    if (str.length) {
      fragments.add(str);
      str = '';
    }
  }

  return Array.from(fragments).sort();
}

/**
 * Convert 2D-array to array of arrays with elements from diagonals (diagonals from left bottom to top right, elements from left top to bottom right in each)
 * @param {string[][]} matrix
 * @private
 * @returns {string[][]}
 */
function matrixToDiagonals(matrix) {
  let
    rows = matrix.length,
    cols = matrix[0].length,
    arr = []
    ;

  // rows bottom to top
  for (let i = rows - 1; i >= 0; i--) {
    let diag = [];
    let limit = Math.min(rows - i, cols);
    for (let j = 0; j < limit; j++) {
      diag.push(matrix[i + j][j]);
    }
    arr.push(diag);
  }

  // cols left to right (skip first)
  for (let j = 1; j < cols; j++) {
    let diag = [];
    let limit = Math.min(cols - j, rows);
    for (let i = 0; i < limit; i++) {
      diag.push(matrix[i][j + i]);
    }
    arr.push(diag);
  }

  return arr;
}

/**
 * Check input. Must be string[] with length > 2 and w/out empty strings
 * @param {any} input
 * @private
 * @returns {boolean}
 */
function checkInput(input) {
  return (
    input &&
    Array.isArray(input) &&
    input.length > 1 &&
    !input.some((el) => { return (typeof el !== 'string' || el.length == 0); })
  );
}

/**
 * Compare words
 * @param {string[]} words
 * @private
 * @returns {Set}
 */
function crossCompare(words) {
  let fragments = new Set();
  fragments.add(words[0]);

  for (let i = 1, qty = words.length; i < qty; i++) {
    let newFragments = new Set();
    for (let fragment of fragments) {
      let tmp = getCommonFragment(fragment, words[i]);
      for (let el of tmp) {
        newFragments.add(el);
      }
    }
    fragments = newFragments;
  }
  return fragments;
}

/**
 * Filter output:
 * 1) get max length of fragments
 * 2) remove all fragments which are shorter
 * 3) sort the rest (alphabetically ascending)
 * @param {Set} fragments
 * @private
 * @returns {string[]}
 */
function filterOutput(fragments) {
  let arr = Array.from(fragments);
  let max = 0;
  arr.forEach(el => max = (max < el.length) ? el.length : max);
  return arr.filter(el => el.length == max).sort();
}


// public methods ----------------------

/**
 * Get the longest common fragment
 * @param {string[]} words
 * @returns {string[]}
 */
function getTheLongestCommonFragment(words) {
  if (!checkInput(words)) { throw new Error('Invalid input format'); }
  let fragments = crossCompare(words);
  return filterOutput(fragments);
}

// exports ----------------------

let privateExports = {
  getCommonFragment: getCommonFragment,
  matrixToDiagonals: matrixToDiagonals,
};

let publicExports = {
  getTheLongestCommonFragment: getTheLongestCommonFragment
};

// using this to prevent private methods in IDE autocomplete
if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  Object.assign(publicExports, privateExports);
}

module.exports = publicExports;
