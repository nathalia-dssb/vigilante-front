import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeClosed } from "@solar-icons/react"

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: "left" | "right"
  currency?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, iconPosition = "left", currency = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const isPassword = type === "password"
    const isNumber = type === "number" && currency
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative flex items-center w-full">
        {isNumber && (
          <span className="absolute left-3 text-muted-foreground text-base font-medium">$</span>
        )}

        {Icon && iconPosition === "left" && (
          <Icon className="absolute left-3 h-5 w-5 text-muted-foreground" />
        )}

        <input
          type={inputType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-uaq-default-100 px-4 py-3 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-[400] file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            Icon && iconPosition === "left" ? "pl-10" : "",
            isPassword ? "pr-10" : "",
            isNumber ? "pl-7" : "", 
            className
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center justify-center text-muted-foreground focus:outline-none"
          >
            {showPassword ? (
              <EyeClosed className="h-6 w-6" weight="Bold" />
            ) : (
              <Eye className="h-6 w-6" weight="Bold" />
            )}
          </button>
        )}

        {Icon && !isPassword && iconPosition === "right" && (
          <Icon className="absolute right-3 h-5 w-5 text-muted-foreground" />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
