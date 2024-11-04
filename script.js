/**
 * Calculates the mean (average) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {number} The mean of the numbers in the array.
 * 
 * @example
 * const mean = getMean([1, 2, 3, 4, 5]); // returns 3
 */
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

/**
 * Calculates the median (middle value) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {number} The median of the numbers in the array.
 * 
 * @example
 * const median = getMedian([3, 1, 2]); // returns 2
 * const medianEven = getMedian([3, 1, 2, 4]); // returns 2.5
 */
const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);

  if (sorted.length % 2 === 0) {
    return (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2;
  } else {
    return sorted[Math.floor(sorted.length / 2)];
  }
};

/**
 * Calculates the mode (most frequently occurring value) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {string|null} The mode(s) of the numbers in the array as a comma-separated string, or null if all values are equally frequent.
 * 
 * @example
 * const mode = getMode([1, 2, 3, 3, 4]); // returns "3"
 * const modeEqual = getMode([1, 1, 2, 2]); // returns null
 */
const getMode = (array) => {
  const counts = {};

  array.forEach((el) => (counts[el] = counts[el] ? counts[el] + 1 : 1));

  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }

  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);

  return mode.join(", ");
};

/**
 * Calculates the range (difference between the largest and smallest values) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {number} The range of the numbers in the array.
 * 
 * @example
 * const range = getRange([1, 3, 7]); // returns 6
 */
const getRange = (array) => Math.max(...array) - Math.min(...array);

/**
 * Calculates the variance (measure of how much values differ from the mean) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {number} The variance of the numbers in the array.
 * 
 * @example
 * const variance = getVariance([1, 2, 3]); // returns 0.666...
 */
const getVariance = (array) => {
  const mean = getMean(array);

  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;

      return acc + squared;
    }, 0) / array.length;

  return variance;
};

/**
 * Calculates the standard deviation (square root of the variance) of an array of numbers.
 * @param {number[]} array - An array of numbers.
 * @returns {number} The standard deviation of the numbers in the array.
 * 
 * @example
 * const stdDev = getStandardDeviation([1, 2, 3]); // returns 0.816...
 */
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance) * 0.5;

  return standardDeviation;
};

/**
 * Collects user input from a text input field, calculates statistical measures, 
 * and displays the results in specified HTML elements.
 * @returns {void}
 * 
 * @example
 * calculate(); // When called, it reads the input from the element with id "numbers".
 */
const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
