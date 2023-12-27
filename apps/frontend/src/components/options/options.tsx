import styles from './options.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import { UserModal } from '../user-modal';
import { ListModal } from '../list-modal/list-modal';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useLoginMutation } from '../../store/services/user.api';

export const Options = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggle = () => {
    setIsClicked(!isClicked);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'shared-update-post',
  });

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
            className={styles.menuButton}
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
            className={styles.menuButton}
            onClick={() => {
              setIsHistoryOpen(true);
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
          {result.data && result.data.isAdmin && (
            <button className={styles.menuButton} onClick={() => {}}>
              <Tooltip
                title="הרשאות משתמשים"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                placement="left"
              >
                <AdminPanelSettingsIcon
                  className={styles.menuIcons}
                ></AdminPanelSettingsIcon>
              </Tooltip>
            </button>
          )}
        </div>
      )}
      <UserModal
        isOpen={updateUserOpen}
        setIsOpen={setUpdateUserOpen}
        username={result.data?.username}
        password={result.data?.password}
      />
      <ListModal isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen} />
    </div>
  );
};
