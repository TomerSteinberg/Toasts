import styles from './criminal.module.css';

export interface Props {
  name: string;
  date: string;
  reason: string;
}

export const Criminal = () => {
  return (
    <div className={styles.container}>
      <p>תומר</p>
      <p>פושע רגיל</p>
    </div>
  );
};
