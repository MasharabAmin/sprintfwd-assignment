interface ButtonProps {
  title: string
  onClick?: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  type,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type ?? "button"}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
