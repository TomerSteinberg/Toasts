import styles from './criminal.module.css';

/* eslint-disable-next-line */
export interface CriminalProps {}

export function Criminal(props: CriminalProps) {
  return (
    <div className={styles.container}>
      <p>תומר</p>
      <p>רגיל </p>
    </div>
  );
}

export default Criminal;
