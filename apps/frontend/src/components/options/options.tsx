import styles from './options.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { UserModal } from '../user-modal';
import { ListModal } from '../list-modal/list-modal';

export const Options = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
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
          className={isClicked ? styles.optionsIconOpen : styles.optionsIcon}
        />
      </button>
      {isClicked && (
        <div className={styles.menuButtons}>
          <button
            className={styles.menuBtn}
            onClick={() => {
              setUpdateUserOpen(true);
            }}
          >
            <Tooltip
              title="הגדרות משתמש"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              placement="left"
            >
              <AccountCircleIcon className={styles.menuIcons} />
            </Tooltip>
          </button>
          <button
            className={styles.menuBtn}
            onClick={() => {
              setHistoryOpen(true);
            }}
          >
            <Tooltip
              title="היסטורית שתיות"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              placement="left"
            >
              <HistoryIcon className={styles.menuIcons} />
            </Tooltip>
          </button>
        </div>
      )}
      <UserModal
        openModal={updateUserOpen}
        setOpenModal={setUpdateUserOpen}
        username="placeholder"
        password="placeholder"
      />
      <ListModal openModal={historyOpen} setOpenModal={setHistoryOpen} />
    </div>
  );
};
