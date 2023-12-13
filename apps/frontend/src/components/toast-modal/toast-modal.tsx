import styles from './toast-modal.module.css';

/* eslint-disable-next-line */
export interface ToastModalProps {}

export function ToastModal(props: ToastModalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ToastModal!</h1>
    </div>
  );
}

export default ToastModal;
