import styles from './toast.module.css';

/* eslint-disable-next-line */
export interface ToastProps {}

export function Toast(props: ToastProps) {
  return (
    <div className={styles.container}>
      <p>name</p>
      <p>date</p>
      <p>reason</p>
    </div>
  );
}

export default Toast;
