/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

import {
  allPass,
  compose,
  lt,
  gt,
  test,
  tap,
  length,
  ifElse,
  partial,
  assoc,
  prop,
  andThen,
  modulo,
  toString,
  otherwise,
  concat,
  __,
} from "ramda";

const API_NUMBER_BASE = "https://api.tech/numbers/base";
const API_ANIMALS_TECH = "https://animals.tech/";

const api = new Api();

const getResponseResult = compose(String, prop("result"));
const buildAnimalsEndpoint = andThen(concat(API_ANIMALS_TECH));

const thenGetResponseResult = andThen(getResponseResult);
const getValueLength = andThen(length);

const getModulo = modulo(__, 3);
const thenModuloValue = andThen(getModulo);

const getSqrtValue = (num) => num ** 2;
const thenGetSqrtValue = andThen(getSqrtValue);

const toNumberWithRound = compose(Math.round, Number);

const thenGetString = andThen(toString(__));

const containsOnlyDigigtsAndDot = test(/^[0-9]*\.?[0-9]*$/);

const isLengthLess = compose(lt(__, 10), length);
const isLengthMore = compose(gt(__, 2), length);

const validateValue = allPass([
  containsOnlyDigigtsAndDot,
  isLengthLess,
  isLengthMore,
]);

const assocInputValue = assoc("number", __, {
  from: 10,
  to: 2,
});

const getNumberBase = compose(api.get(API_NUMBER_BASE), assocInputValue);
const getAnimalsTech = andThen(api.get(__, {}));

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    
  const log = tap(writeLog);
  const thenLog = andThen(log);
  const handleSuccessSequence = andThen(handleSuccess);
  const handleUncaughtrError = otherwise(handleError);
  const handleValidationError = partial(handleError, ["ValidationError"]);

  const processSequence = compose(
    handleUncaughtrError,
    handleSuccessSequence,
    thenLog,
    thenGetResponseResult,
    getAnimalsTech,
    thenLog,
    buildAnimalsEndpoint,
    thenGetString,
    thenLog,
    thenModuloValue,
    thenLog,
    thenGetSqrtValue,
    thenLog,
    getValueLength,
    thenLog,
    thenGetResponseResult,
    getNumberBase,
    log,
    toNumberWithRound
  );

  const handleValidation = ifElse(
    validateValue,
    compose(processSequence, log),
    compose(handleValidationError, log)
  );

  handleValidation(value);
};

export default processSequence;
