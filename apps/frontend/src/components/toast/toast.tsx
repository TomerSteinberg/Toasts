import styles from './toast.module.css';

export interface Props {
  name: string;
  date: string;
  reason: string;
}
export const Toast: React.FC<Props> = ({ name, date, reason }) => {
  return (
    <div className={styles.container}>
      <p>{name}</p>
      <p>{date}</p>
      <p>{reason}</p>
    </div>
  );
};
