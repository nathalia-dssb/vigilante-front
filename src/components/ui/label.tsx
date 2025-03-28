"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "flex justify-between w-full text-sm font-[400]",
        count: "flex justify-between w-full text-sm font-[400]",
        description: "flex justify-between w-full text-sm font-[300]"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  inputRef?: React.RefObject<HTMLInputElement | null>
  maxChars?: number
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, inputRef, maxChars = 50, children, ...props }, ref) => {
  const [charCount, setCharCount] = React.useState(0)

  React.useEffect(() => {
    if (variant === "count" && inputRef?.current) {
      const handleInput = () => {
        const length = inputRef.current?.value.length || 0
        setCharCount(length)
      }

      inputRef.current.addEventListener("input", handleInput)
      return () => inputRef.current?.removeEventListener("input", handleInput)
    }
  }, [variant, inputRef])

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {children}
      {variant === "count" && (
        <span className="ml-2 text-gray-500">
          {charCount} / {maxChars}
        </span>
      )}
    </LabelPrimitive.Root>
  )
})

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
