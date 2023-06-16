import React, { useState } from "react"
import styles from "./TodoCard.module.css"
import Modal from "@/components/organisms/Modal"
import Button from "@/components/atoms/Button"
import { CONSTANTS } from "@/constants/constants"
import { TodoProps } from "@/interfaces/todo.interface"

export interface TodoCardProps {
  todo: TodoProps
  handleDelete: (todo: TodoProps) => void
  completed?: boolean
  handleEdit: (task: TodoProps, title: string) => void
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  handleDelete,
  handleEdit,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const dragStarted = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(CONSTANTS.TASK, JSON.stringify(todo))
  }
  const onDelete = () => {
    handleOpenDialog()
  }
  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }
  
  return (
    <>
      {isDialogOpen && (
        <Modal
          onRequestClose={handleCloseDialog}
          closeOnOutsideClick={false}
          onSubmit={handleDelete}
          task={todo}
          submitText={CONSTANTS.DELETE}
          style={{ minWidth: "10%" }}
        >
          <p>{CONSTANTS.CONFIRMATION}</p>
        </Modal>
      )}
      <div className={styles.card} draggable onDragStart={dragStarted}>
        <div className={styles.todo}>
          <div>
            <span className={styles.todoText}>{todo.title}</span>
          </div>
          <div className={styles.row}>
            {!todo.completed && (
              <Button
                title={CONSTANTS.EDIT}
                onClick={() => handleEdit(todo, CONSTANTS.EDIT)}
                className={styles.editButton}
              />
            )}
            <Button
              title={CONSTANTS.DELETE}
              onClick={onDelete}
              className={styles.deleteButton}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoCard
