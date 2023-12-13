import styles from './options.module.css';
import SettingsIcon from '@mui/icons-material/Settings';

/* eslint-disable-next-line */
export interface OptionsProps {}

export function Options(props: OptionsProps) {
  return (
    <div className={styles.container}>
      <button className={styles.options}>
        <SettingsIcon className={styles.options_icon} />
      </button>
    </div>
  );
}

export default Options;
