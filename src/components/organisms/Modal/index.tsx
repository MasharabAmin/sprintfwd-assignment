import React, { useMemo, useRef, useState } from "react"
import styles from "./Modal.module.css"
import Button from "@/components/atoms/Button"
import TextField from "@/components/atoms/TextField"
import { v4 as uuid } from "uuid"
import { CONSTANTS } from "@/constants/constants"
import { TodoProps } from "@/interfaces/todo.interface"

interface Actions {
  Delete: TodoProps
  Create: TodoProps
  Edit: TodoProps
}
interface ModalProps {
  closeOnOutsideClick: boolean
  onRequestClose: () => void
  children?: React.ReactNode
  style?: React.CSSProperties
  onSubmit: (e: TodoProps) => void
  submitText?: string
  task: TodoProps
}

const Modal: React.FC<ModalProps> = ({
  closeOnOutsideClick,
  onRequestClose,
  task,
  onSubmit,
  children,
  submitText,
  style,
}) => {
  const [todoText, setTodoText] = useState((task?.title as string) || "")
  const dialogRef = useRef<HTMLDivElement>(null)

  const ActionsType: Actions = useMemo(() => ({
    Delete: task,
    Create: {
      id: uuid(),
      title: todoText,
      completed: false,
    },
    Edit: {
      ...task,
      title: todoText,
    },
  }), [task, todoText])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onSubmit(ActionsType[submitText as keyof Actions])
    onRequestClose()
  }
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const dialogNode = dialogRef.current
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose()
    }
  }
  return (
    <div
      ref={dialogRef}
      className={styles.dialogBackdrop}
      onClick={handleOutsideClick}
    >
      <div className={styles.dialog} style={style}>
        <h3>{submitText} todo</h3>
        <div>
          {children ? (
            children
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <TextField
                value={todoText}
                onChange={handleChange}
                placeholder={CONSTANTS.PLACEHOLDER_NEW_TODO}
              />
            </form>
          )}
        </div>
        <div className={styles.actions}>
          <Button
            title={CONSTANTS.CANCEL}
            onClick={onRequestClose}
            className={styles.closeButton}
          />
          <Button
            title={String(submitText)}
            className={styles.button}
            disabled={todoText === ""}
            type='submit'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
export default Modal
