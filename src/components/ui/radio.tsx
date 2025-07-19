import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva } from "class-variance-authority"

const radioGroupItemVariants = cva(
  "aspect-square h-5 w-5 rounded-full border border-wood-brown bg-white text-wood-brown shadow focus:outline-none focus:ring-2 focus:ring-wood-brown disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
  {
    variants: {
      checked: {
        true: "border-2 border-wood-brown",
        false: "border border-wood-brown/20",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
)

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={"grid gap-2 " + (className || "")}
    {...props}
    ref={ref}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={radioGroupItemVariants({ className, checked: props.checked })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="block h-2.5 w-2.5 rounded-full bg-wood-brown" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
