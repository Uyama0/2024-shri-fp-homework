/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  anyPass,
  complement,
  equals,
  prop,
  compose,
  gte,
  length,
  filter,
  values,
  all,
  __,
} from "ramda";

const getStarColor = prop("star");
const getSquareColor = prop("square");
const getTriangleColor = prop("triangle");
const getCircleColor = prop("circle");

const isGreen = equals("green");
const isRed = equals("red");
const isOrange = equals("orange");
const isBlue = equals("blue");
const isWhite = equals("white");

const notWhite = complement(isWhite);
const notRed = complement(isRed);

const isStarRed = compose(isRed, getStarColor);
const isStarNotRed = compose(notRed, getStarColor);
const isStarNotWhite = compose(notWhite, getStarColor);

const isSquareGreen = compose(isGreen, getSquareColor);
const isSquareOrange = compose(isOrange, getSquareColor);
const isSquareNotWhite = compose(notWhite, getSquareColor);

const isTriangleWhite = compose(isWhite, getTriangleColor);
const isTriangleGreen = compose(isGreen, getTriangleColor);
const isTriangleNotWhite = compose(notWhite, getTriangleColor);

const isCircleWhite = compose(isWhite, getCircleColor);
const isCircleBlue = compose(isBlue, getCircleColor);

const isGreaterOrEqualTwo = gte(__, 2);
const isGreaterOrEqualThree = gte(__, 3);
const isGreaterOrEqualFour = gte(__, 4);

const isStrictEqualOne = equals(1);
const isStrictEqualTwo = equals(2);

const getValues = values;

const greenCount = compose(length, filter(isGreen), getValues);
const redCount = compose(length, filter(isRed), getValues);
const orangeCount = compose(length, filter(isOrange), getValues);
const blueCount = compose(length, filter(isBlue), getValues);

const colorsEquals = (...colors) => {
  const [firstColor, ...otherColors] = colors;
  return all(equals(firstColor), otherColors);
};

const triangleEqualsSquare = ({ square, triangle }) =>
  colorsEquals(square, triangle);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isStarRed,
  isSquareGreen,
  isTriangleWhite,
  isCircleWhite,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isGreaterOrEqualTwo, greenCount);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = allPass([
  compose(isStrictEqualTwo, redCount),
  compose(isStrictEqualTwo, blueCount),
]);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isCircleBlue,
  isStarRed,
  isSquareOrange,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([
  compose(isGreaterOrEqualThree, greenCount),
  compose(isGreaterOrEqualThree, orangeCount),
  compose(isGreaterOrEqualThree, redCount),
  compose(isGreaterOrEqualThree, blueCount),
]);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  isTriangleGreen,
  compose(isStrictEqualTwo, greenCount),
  compose(isStrictEqualOne, redCount),
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(isGreaterOrEqualFour, orangeCount);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isStarNotWhite, isStarNotRed]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(isGreaterOrEqualFour, greenCount);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  isSquareNotWhite,
  isTriangleNotWhite,
  triangleEqualsSquare,
]);
