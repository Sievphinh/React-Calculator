import React, { useState } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import KeypadContainer from "./components/KeypadContainer";
import Keypad from "./components/Keypad";

const keypadValue = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [1, 2, 3, "+"],
  [4, 5, 6, "-"],
  [0, ".", "="],
];

const App = () => {
  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  const removeSpace = (num) => num.toString().replace(/\s/g, "");
  console.log(removeSpace("123 124"), toLocaleString(123455.1223));
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  const numClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;
    if (removeSpace(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
            ? toLocaleString(Number(removeSpace(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const invertClickHanlder = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num: calc.num * -1,
      res: calc.res * -1,
    });
  };
  const commaClickHandler = (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);
    let value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  const signClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpace(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpace(calc.res)) : 0;
    setCalc({
      ...calc,
      res: (res /= 100),
      num: (num /= 100),
      sign: "",
    });
  };
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  const equalClickHandler = () => {
    const doSomeMath = (op1, op2, operator) => {
      return operator === "+"
        ? op1 + op2
        : operator === "-"
        ? op1 - op2
        : operator === "X"
        ? op1 * op2
        : op1 / op2;
    };
    setCalc({
      ...calc,
      res:
        calc.num === "0" && calc.sign === "/"
          ? "How can you divide number with zero! you stupid"
          : toLocaleString(
              doSomeMath(
                Number(removeSpace(calc.res)),
                Number(removeSpace(calc.num)),
                calc.sign
              )
            ),
      num: 0,
      sign: "",
    });
  };
  return (
    <div className="App">
      <h2>React Calculator 👨📐✏️📈</h2>
      <Wrapper>
        <Display value={calc.num ? calc.num : calc.res} />
        <KeypadContainer>
          {keypadValue.flat().map((keypad, i) => {
            return (
              <Keypad
                className={keypad === "=" ? "equals" : ""}
                key={i}
                value={keypad}
                onClick={
                  keypad === "C"
                    ? resetClickHandler
                    : keypad === "+-"
                    ? invertClickHanlder
                    : keypad === "%"
                    ? percentClickHandler
                    : keypad === "="
                    ? equalClickHandler
                    : keypad === "+" ||
                      keypad === "-" ||
                      keypad === "X" ||
                      keypad === "/"
                    ? signClickHandler
                    : keypad === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </KeypadContainer>
      </Wrapper>
    </div>
  );
};

export default App;
