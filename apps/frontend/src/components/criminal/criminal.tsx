import styles from './criminal.module.css';

/* eslint-disable-next-line */
export interface CriminalProps {}

export function Criminal(props: CriminalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Criminal!</h1>
    </div>
  );
}

export default Criminal;
