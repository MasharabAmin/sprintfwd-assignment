import { CONSTANTS } from "@/constants/constants"
import styles from "./TextField.module.css"

export interface TextFieldProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({ value, onChange, placeholder }: TextFieldProps) => {
  return (
    <input
      className={styles.input}
      type={CONSTANTS.TEXT}
      placeholder={placeholder || ''}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextField
