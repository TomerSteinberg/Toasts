import styles from './options.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';

/* eslint-disable-next-line */
export interface OptionsProps {}

export function Options(props: OptionsProps) {
  const [isClicked, setIsClicked] = useState(false);
  const toggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.options}
        onClick={() => {
          toggle();
        }}
      >
        <SettingsIcon className={styles.options_icon} />
      </button>
      {isClicked && (
        <div className={styles.menu_buttons}>
          <button className={styles.menu_btn}>
            <Tooltip
              title="Profile Settings"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              placement="left"
            >
              <AccountCircleIcon className={styles.menu_icons} />
            </Tooltip>
          </button>
          <button className={styles.menu_btn}>
            <Tooltip
              title="Toast History"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              placement="left"
            >
              <HistoryIcon className={styles.menu_icons} />
            </Tooltip>
          </button>
        </div>
      )}
    </div>
  );
}

export default Options;
