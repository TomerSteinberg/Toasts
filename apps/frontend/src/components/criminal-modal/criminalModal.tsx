import styles from './criminalModal.module.css';

/* eslint-disable-next-line */
export interface CriminalModalProps {}

export function CriminalModal(props: CriminalModalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CriminalModal!</h1>
    </div>
  );
}

export default CriminalModal;
