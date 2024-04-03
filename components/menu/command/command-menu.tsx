'use client'

import * as React from "react"
import {
  CalculatorIcon,
  CalendarIcon,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useHotkeys } from "react-hotkeys-hook"
import { addDraggable } from "@/lib/draggable/store"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator } from "@/components/utilitary/calculator/calculator"


interface ICommandMenuGroup {
  label?: string;
  items: ICommandMenuItem[];
}
interface ICommandMenuItem {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  subMenu?: ICommandMenuItem[];
  action?: () => void;
  disabled?: boolean;
}

interface CommandMenuProps {
  items?: ICommandMenuGroup[];
  shortcut?: string; // e.g. "ctrl + K"
  onOpenChange?: (open: boolean) => void;
}

export default function CommandMenu(
  { items = [], shortcut, onOpenChange }: CommandMenuProps
) {
  const [open, setOpen] = React.useState(false)

  // open the command menu when the shortcut is pressed
  //(react-hotkeys-hook)
  useHotkeys(shortcut ?? "ctrl + K", () => {
    setOpen((prev) => !prev)
  }, {
    preventDefault: true,
  });

  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(open)
    }
  }, [open, onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {/* render the groups , each group is separated by a separator */}
        {items.map((group, index) => (
          <React.Fragment key={`${group.label}-${index}`}>
            <CommandMenuGroup
              label={group.label ?? ""}
              items={group.items}
              onSelect={() => {
                setOpen(false)
              }}
            />
            {index < items.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

interface ICommandMenuGroupProps extends ICommandMenuGroup {
  onSelect: (label: string) => void;
}

function CommandMenuGroup({
  label,
  items,
  onSelect
}: ICommandMenuGroupProps) {
  return (
    <CommandGroup heading={label} >
      {items.map((item, index) => (
        <CommandMenuItem
          key={`${item.label}-${index}`}
          label={item.label}
          description={item.description}
          icon={item.icon}
          shortcut={item.shortcut}
          action={item.action}
          disabled={item.disabled}
          onSelect={() => onSelect(item.label)}
        />
      ))}
    </CommandGroup>
  )
}


interface ICommandMenuItemProps extends ICommandMenuItem {
  onSelect: () => void;
}

function CommandMenuItem({
  label,
  description,
  icon,
  shortcut,
  action,
  disabled,
  onSelect
}: ICommandMenuItemProps) {

  useHotkeys(shortcut ?? "", action ?? (() => { }), {
    enabled: !!action,
    preventDefault: true,
  })

  return (
    <CommandItem
      value={label}
      title={description}
      onSelect={
        () => {
          action?.();
          onSelect();
        }
      }
      disabled={disabled}
    >
      <span className="mr-4 h-4 w-4" >
        {icon}
      </span>
      <span className="flex flex-col">
        {label}
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </span>
      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
    </CommandItem>
  )


}


export { CommandMenuGroup, CommandMenuItem }
export type { ICommandMenuGroup, ICommandMenuItem, CommandMenuProps }


// basic commands :
// - open calculator


export const commandMenuItems: ICommandMenuGroup[] = [
  {
    label: "Basic",
    items: [
      {
        label: "Open Calculator",
        icon: <CalculatorIcon size={20} />,
        action: () => addDraggable({
          id: "calculator",
          draggableProps: {
            defaultPosition: { x: 200, y: 200 },
          },
          showDraggable: () => (
            <Calculator />
          ),
        }),
        description: "Open the calculator app",
      },
      {
        label: "Open Calendar",
        icon: <CalendarIcon size={20} />,
        action: () => addDraggable({
          id: "calendar",
          draggableProps: {
            defaultPosition: { x: 200, y: 200 },
          },
          showDraggable: () => (
            <Calendar
              mode="single"
            />
          ),
        }),
      },

    ],
  },
  {
    label: "Advanced",
    items: [
      {
        label: "Open Settings",
        icon: <Settings size={20} />,
        action: () => alert("Open Settings"),
        shortcut: "ctrl + ,",
      },
      {
        label: "Open Profile",
        icon: <User size={20} />,
        action: () => alert("Open Profile"),
      },
      {
        label: "Open Smile",
        icon: <Smile size={20} />,
        action: () => alert("Open Smile"),
      },
    ],
  },
]
