import styles from './options.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';

export const Options = () => {
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
        <SettingsIcon
          className={isClicked ? styles.options_icon_open : styles.options_icon}
        />
      </button>
      {isClicked && (
        <div className={styles.menu_buttons}>
          <button className={styles.menu_btn}>
            <Tooltip
              title="הגדרות משתמש"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              placement="left"
            >
              <AccountCircleIcon className={styles.menu_icons} />
            </Tooltip>
          </button>
          <button className={styles.menu_btn}>
            <Tooltip
              title="היסטורית שתיות"
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
};
