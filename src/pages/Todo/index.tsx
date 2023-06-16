import React, { useEffect, useState } from "react"
import TodoCard from "@/components/organisms/TodoCard"
import FloatingButton from "@/components/molecules/FloatingActionButton"
import styles from "./Todo.module.css"
import { TodoProps } from "@/interfaces/todo.interface"
import Modal from "@/components/organisms/Modal"
import { CONSTANTS, MESSAGES } from "@/constants/constants"
import { useAppContext } from "@/store/context"
import { fetchTodoList } from "@/api/todo"
import Loading from "@/pages/Loading"
import TextField from "@/components/atoms/TextField"

const newTask = {
  id: '',
  title: '',
  completed: false
}

const Todo = () => {
  const [title, setTitle] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isLoading, setLoader] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<TodoProps>(newTask)
  const [todos, setTodos] = useState<TodoProps[]>([newTask])

  const { activeTasks, setActiveTasks, completedTasks, setCompletedTasks } =
    useAppContext()

  const handleOpenDialog = () => {
    setTitle(CONSTANTS.CREATE)
    setSelectedTask(newTask)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleEdit = (task: TodoProps, title: string) => {
    setTitle(title)
    setIsDialogOpen(true)
    setSelectedTask(task)
  }
  const EditTask = (task: TodoProps) => {
    setActiveTasks((prev) => {
      const updatedTasks = [...prev]
      const currentTaskIndex = updatedTasks.findIndex(
        (todo) => todo.id === task.id
      )
      if (currentTaskIndex !== -1) {
        updatedTasks[currentTaskIndex] = task
      }
      return updatedTasks
    })
  }
  const handleCreate = (task: TodoProps) => {
    setActiveTasks((prev) => [...prev, task])
  }
  const handleTaskDelete = (todo: TodoProps) => {
    todo.completed
      ? setCompletedTasks((prev) => prev.filter((task) => task.id !== todo.id))
      : setActiveTasks((prev) => prev.filter((task) => task.id !== todo.id))
  }
  const onDragging = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const dragDropped = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const transfer = JSON.parse(e.dataTransfer.getData("task"))
    const targetId = e.currentTarget.id

    if (targetId === CONSTANTS.ACTIVE) {
      const exists = activeTasks.some((todo) => todo.id === transfer.id)
      if (!exists) {
        transfer.completed = false
        setActiveTasks((prev) => [...prev, transfer])
        setCompletedTasks((prev) =>
          prev.filter((task) => task.id !== transfer.id)
        )
      }
    } else if (targetId === CONSTANTS.COMPLETED) {
      const exists = completedTasks.some((todo) => todo.id === transfer.id)
      if (!exists) {
        transfer.completed = true
        setCompletedTasks((prev) => [...prev, transfer])
        setActiveTasks((prev) =>
          prev.filter((task) => task.id !== transfer.id)
        )
      }
    }
  }

  const fetchData = async () => {
    try {
      if (!activeTasks.length && !completedTasks.length) {
        setLoader(true)
      }
      const todoList = await fetchTodoList()
      setTodos(todoList)
      setActiveTasks(todoList.filter((todo: TodoProps) => !todo.completed))
      setCompletedTasks(todoList.filter((todo: TodoProps) => todo.completed))
    } catch (error) {
      alert(MESSAGES.ERROR)
    }
  }

  useEffect(() => {
    if (!query) {
      fetchData()
    } else {
      const todosToShow = todos.filter((todo: TodoProps) => 
        todo.title.toLowerCase().includes(query.toLowerCase()))
      setActiveTasks(todosToShow.filter((todo: TodoProps) => !todo.completed))
      setCompletedTasks(todosToShow.filter((todo: TodoProps) => todo.completed))
      setLoader(false)
    }
  }, [query])

  if (isLoading) {
    <Loading />
  }

  return (
    <div>
      {isDialogOpen && (
        <Modal
          onRequestClose={handleCloseDialog}
          closeOnOutsideClick
          style={{ minWidth: "20%" }}
          task={selectedTask}
          submitText={title}
          onSubmit={title === CONSTANTS.EDIT ? EditTask : handleCreate}
        ></Modal>
      )}
      <div className={styles.search}>
        <TextField
          placeholder={CONSTANTS.PLACEHOLDER_INDEX_TODO}
          onChange={handleChange}
          value={query}
        />
      </div>
      <div className={styles.container}>
        <FloatingButton onClick={handleOpenDialog} />
        <div
          className={styles.leftContainer}
          onDragOver={onDragging}
          onDrop={dragDropped}
          id={CONSTANTS.ACTIVE}
        >
          <h3>{CONSTANTS.ACTIVE_TASKS}</h3>
          {activeTasks.map((todo) => (
            <TodoCard
              todo={todo}
              key={todo?.id}
              handleDelete={handleTaskDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
        <div
          className={styles.leftContainer}
          onDragOver={onDragging}
          onDrop={dragDropped}
          id={CONSTANTS.COMPLETED}
        >
          <h3>{CONSTANTS.COMPLETED_TASKS}</h3>
          {completedTasks?.length > 0 &&
            completedTasks?.map((todo) => (
              <TodoCard
                todo={todo}
                key={todo?.id}
                handleDelete={handleTaskDelete}
                handleEdit={handleEdit}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
