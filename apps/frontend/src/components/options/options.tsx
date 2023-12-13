import styles from './options.module.css';

/* eslint-disable-next-line */
export interface OptionsProps {}

export function Options(props: OptionsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Options!</h1>
    </div>
  );
}

export default Options;
