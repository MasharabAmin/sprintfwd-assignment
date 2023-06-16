import styles from "./NotFound.module.css"
import { CONSTANTS } from "@/constants/constants"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{CONSTANTS.PAGE_NOT_FOUND}</h1>
      <p className={styles.message}>{CONSTANTS.RELOAD}</p>
    </div>
  )
}

export default NotFound
