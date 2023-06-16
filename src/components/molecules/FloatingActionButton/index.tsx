import Button from "@/components/atoms/Button";
import styles from "./FloatingActionButton.module.css";

export interface FloatingButtonProps {
  onClick: () => void
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.floatingButton} onClick={onClick}>
      <Button title='+' />
    </div>
  );
};

export default FloatingButton;
