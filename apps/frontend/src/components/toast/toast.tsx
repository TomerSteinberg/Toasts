import styles from './toast.module.css';

/* eslint-disable-next-line */
export interface ToastProps {}

export const Toast: React.FC<ToastProps> = (props: ToastProps) => {
  return (
    <div className={styles.container}>
      <p>תומר</p>
      <p>14/02/2024</p>
      <p>יום הולדת</p>
    </div>
  );
};

export default Toast;
