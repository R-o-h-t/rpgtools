import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Asterisk, AsteriskIcon, DeleteIcon, DivideIcon, DotIcon, EqualIcon, MinusIcon, Percent, PercentIcon, PlusIcon } from "lucide-react";
import React from "react";
import { type Keys, useHotkeys } from "react-hotkeys-hook";
import { useCalculator } from "./calculator-util";


export function Calculator() {

  const calculator = useCalculator();

  return (
    <div className="flex flex-col w-full h-full space-y-2 p-2">
      <div className="flex-1 flex flex-col justify-end p-2">
        {/* previous value, light, smaller, aligned right, overflow by the left */}
        <div className="text-xs text-right overflow-x-auto">
          {calculator.error ?? calculator.history[calculator.history.length - 1]?.calculus ?? "\u00A0"}
        </div>
        {/* current value, big, aligned right, overflow by the left */}
        <div className="text-3xl text-right overflow-x-auto">
          {calculator.result ?? calculator.calculus ?? "0"}
        </div>

      </div>
      <div className="flex-1 flex flex-col space-y-2">

        <div className="flex space-x-2">
          {/* ( */}
          <ShortcutButton
            keys={["("]}
            onClick={() => calculator.handleKey("(")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <span className="text-xl">
              {"("}
            </span>
          </ShortcutButton>

          {/* ) */}
          <ShortcutButton
            keys={[")"]}
            onClick={() => calculator.handleKey(")")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <span className="text-xl">
              {")"}
            </span>
          </ShortcutButton>

          {/* % */}
          <ShortcutButton
            keys={["%"]}
            onClick={() => calculator.handleKey("%")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <PercentIcon />
          </ShortcutButton>

          {/*delete the last digit */}
          <ShortcutButton
            keys={["Backspace", "Delete"]}
            onClick={calculator.erase}
            onDoubleClick={calculator.reset}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <DeleteIcon />
          </ShortcutButton>
        </div>
        <div className="flex space-x-2">
          {/* 7 */}
          <ShortcutButton
            keys={["7", "Numpad7", "è"]}
            onClick={() => calculator.handleKey("7")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              7
            </span>
          </ShortcutButton>

          {/* 8 */}
          <ShortcutButton
            keys={["8", "Numpad8", "_"]}
            onClick={() => calculator.handleKey("8")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              8
            </span>
          </ShortcutButton>

          {/* 9 */}
          <ShortcutButton
            keys={["9", "Numpad9", "ç"]}
            onClick={() => calculator.handleKey("9")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              9
            </span>
          </ShortcutButton>

          {/* / */}
          <ShortcutButton
            keys={["/", "NumpadDivide"]}
            onClick={() => calculator.handleKey("/")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <DivideIcon />
          </ShortcutButton>
        </div>
        <div className="flex space-x-2">
          {/* 4 */}
          <ShortcutButton
            keys={["4", "Numpad4", "'"]}
            onClick={() => calculator.handleKey("4")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              4
            </span>
          </ShortcutButton>

          {/* 5 */}
          <ShortcutButton
            keys={["5", "Numpad5", "("]}
            onClick={() => calculator.handleKey("5")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              5
            </span>
          </ShortcutButton>

          {/* 6 */}
          <ShortcutButton
            keys={["6", "Numpad6", "-"]}
            onClick={() => calculator.handleKey("6")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              6
            </span>
          </ShortcutButton>

          {/* * */}
          <ShortcutButton
            keys={["NumpadMultiply"]}
            onClick={() => calculator.handleKey("*")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <AsteriskIcon />
          </ShortcutButton>
        </div>
        <div className="flex space-x-2">
          {/* 1 */}
          <ShortcutButton
            keys={["1", "Numpad1", "&"]}
            onClick={() => calculator.handleKey("1")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              1
            </span>
          </ShortcutButton>

          {/* 2 */}
          <ShortcutButton
            keys={["2", "Numpad2", "é"]}
            onClick={() => calculator.handleKey("2")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              2
            </span>
          </ShortcutButton>

          {/* 3 */}
          <ShortcutButton
            keys={["3", "Numpad3", '"']}
            onClick={() => calculator.handleKey("3")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              3
            </span>
          </ShortcutButton>

          {/* - */}
          <ShortcutButton
            keys={["-", "NumpadSubtract"]}
            onClick={() => calculator.handleKey("-")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <MinusIcon />
          </ShortcutButton>
        </div>
        <div className="flex space-x-2">
          {/* 0 */}
          <ShortcutButton
            keys={["0", "Numpad0"]}
            onClick={() => calculator.handleKey("0")}
            className="flex-1"
            variant="secondary"
          >
            <span className="text-xl">
              0
            </span>
          </ShortcutButton>

          {/* . */}
          <ShortcutButton
            keys={[".", "NumpadDecimal"]}
            onClick={() => calculator.handleKey(".")}
            className="flex-1"
            variant="secondary"
          >
            <DotIcon />
          </ShortcutButton>

          {/* = */}
          <ShortcutButton
            keys={["Enter", "NumpadEnter"]}
            onClick={calculator.getResult}
            className="flex-1 bg-blue-300"
            variant="secondary"
          >
            <EqualIcon />
          </ShortcutButton>

          {/* + */}
          <ShortcutButton
            keys={["+", "NumpadAdd"]}
            onClick={() => calculator.handleKey("+")}
            className="flex-1 bg-slate-200"
            variant="secondary"
          >
            <PlusIcon />
          </ShortcutButton>
        </div>
      </div>
    </div >
  )
}


// Button with shortcut
interface IShortcutButtonProps extends ButtonProps {
  keys: Keys;
  onClick?: () => void;
}


export function ShortcutButton({ keys: shortcut, children, ...props }: IShortcutButtonProps) {

  const lastCall = React.useRef(0)

  useHotkeys(shortcut, (key) => {

    if (!lastCall.current || Date.now() - lastCall.current > 100) {
      console.log({
        key: key.key,
        shortcut,
      })
      props.onClick?.()
      lastCall.current = Date.now()
    }
  }, {
    preventDefault: true,
  },
    [props.onClick, shortcut])

  return (
    <Button {...props}
    >
      {children}
    </Button>
  )

}
