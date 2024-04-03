// the calculator is simple
// when the user clicks on a button, the value is added to the current value (be it a number or an operator)
// ex : if the current value is 5 and the user clicks on 7, the current value becomes 57, if the user clicks on +, the current value becomes 57+ ...

import { useState } from "react";

// when the user press the equal button, the current value is calculated from the calculus string and the result is displayed
// and the calculus string is displayed above the result
// if the result is present the "erase" button reset the current value and the calculus string, if the result is not present, it erase the last character of the calculus string


type CalculatorUtil = {
  result?: number;
  error?: string;
  calculus: string;
  handleKey: (key: string) => void;
  getResult: () => void;
  erase: () => void;
  reset: () => void;
  history: {
    result: number;
    calculus: string;
  }[]
};

export const useCalculator = (): CalculatorUtil => {
  const [result, setResult] = useState<number>();
  const [error, setError] = useState<string>();
  const [calculus, setCalculus] = useState<string>("0");
  const [history, setHistory] = useState<{ result: number; calculus: string }[]>([]);

  const handleKey = (key: string) => {
    if (calculus === "0" && key !== ".") {
      setCalculus(key);
      return;
    }
    if (error) {
      setError(undefined);
    }
    if (result) {
      setResult(undefined);
    }
    setCalculus((prev) => prev + key);
  };

  const getResult = () => {
    try {
      const res = calculate(calculus);
      setResult(res);
      setHistory((prev) => [...prev, { result: res, calculus }]);
      setCalculus(res.toString());
    } catch (e) {
      setError(e.message);
    }
  };

  const erase = () => {

    if (error) {
      setError(undefined);
    }
    if (result) {
      setResult(undefined);
    }
    if (calculus.length > 1) {
      setCalculus((prev) => prev.slice(0, -1));
    }
    else {
      setCalculus("0");
    }

  };

  const reset = () => {
    setResult(undefined);
    setError(undefined);
    setHistory([]);
    setCalculus("0");
  };

  return {
    result,
    error,
    calculus,
    handleKey,
    getResult,
    erase,
    reset,
    history,
  };
};

// ex : calculate("5+7") => 12
// ex : calculate("5+7*2") => 19
// ex : calculate("5+7*2-3") => 16
// ex : calculate("5+7*2-3/3") => 15
// ex : calculate("5+7*2-3/0") => ERROR
// ex : calculate("-5 + 7 * 2 - 3 / 3") => 16
// ex : calculate("(-5 + 7) * 2 - 3 / 3") => 9
// ex : calculate("50%") => 0.5
// ex : calculate("50%*2") => 1

function calculate(calculus: string): number {

  let formattedCalculus = calculus;
  // remove spaces
  formattedCalculus = formattedCalculus.split(" ").join("");

  // replace the % by /100
  formattedCalculus = formattedCalculus.split("%").join("/100");
  console.log(formattedCalculus)

  // handle the parenthesis as separate calculus (recursion)
  const subCalculus = getSubCalculus(formattedCalculus);
  if (subCalculus?.length) {
    formattedCalculus = formattedCalculus.replace(`(${subCalculus})`, calculate(subCalculus).toString());
  }

  const evalCalculus = eval(formattedCalculus);
  if (Number.isNaN(evalCalculus)) {
    throw new Error("ERROR");
  }
  // round the result to 10 digits or use scientific notation
  // avoid errors like 0.1 + 0.2 = 0.30000000000000004
  return Number(evalCalculus.toFixed(10));

}


function getSubCalculus(calculus: string): string {
  let parenthesis = 0;
  let subCalculus = "";
  for (let i = 0; i < calculus.length; i++) {
    const char = calculus[i];
    if (char === "(") {
      parenthesis++;
    }
    else if (char === ")") {
      parenthesis--;
    }
    else if (parenthesis > 0) {
      subCalculus += char;
    }
  }
  return subCalculus;

}

