import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './user-modal.module.css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useLoginMutation } from '../../store/services/user.api';
import { Login } from '../../types/login.type';

export interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  username?: string;
  password?: string;
}

export const UserModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  username,
  password,
}) => {
  const LOGIN = false;
  const SIGNUP = true;

  const [updatePost] = useLoginMutation({
    fixedCacheKey: 'shared-update-post',
  });

  const isUpdateUserMode = (): boolean => {
    return username !== undefined && password !== undefined;
  };

  const [usernameIn, setUsernameIn] = useState(
    isUpdateUserMode() ? username : ''
  );
  const [passwordIn, setPasswordIn] = useState(
    isUpdateUserMode() ? password : ''
  );
  const [error, setError] = useState('');
  const [authType, setAuthType] = useState(LOGIN);

  const handleClose = () => {
    if (username && password) {
      setUsernameIn(username);
      setPasswordIn(password);
    }
    setOpenModal(false);
  };

  const sendLogin = async () => {
    if (usernameIn && passwordIn) {
      const loginParams: Login = { username: usernameIn, password: passwordIn };
      try {
        const { username, password, isAdmin } = await updatePost(
          loginParams
        ).unwrap();
        handleClose();
      } catch (e) {
        setError(e.data.message);
      }
    }
  };

  const inputsFilled = (): boolean => {
    return (
      usernameIn !== '' && passwordIn !== undefined && passwordIn.length > 8
    );
  };

  return (
    <div className={styles.container}>
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '30em',
            },
          },
        }}
        open={openModal}
        onClose={isUpdateUserMode() ? handleClose : () => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: '2rem',
            textAlign: 'center',
            fontFamily: 'Segoe UI',
            backgroundColor: '#f9eeda',
          }}
        >
          {isUpdateUserMode() ? (
            <h2>פרטי משתמש</h2>
          ) : (
            <div className={styles.titleContainer}>
              <h2
                onClick={() => {
                  setAuthType(LOGIN);
                }}
                style={{ color: authType ? 'black' : '#ff4242' }}
                className={styles.loginTitle}
              >
                התחבר
              </h2>
              <h2>/</h2>
              <h2
                onClick={() => {
                  setAuthType(SIGNUP);
                }}
                className={styles.signupTitle}
                style={{ color: authType ? '#ff4242' : 'black' }}
              >
                צור משתמש
              </h2>
            </div>
          )}
        </DialogTitle>
        <DialogContent
          sx={{
            background: '#f9eeda',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={styles.contentContainer}>
            <input
              defaultValue={username}
              placeholder="שם משתמש"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUsernameIn(e.target.value);
              }}
            ></input>
            <input
              defaultValue={password}
              placeholder="סיסמא"
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPasswordIn(e.target.value);
              }}
            ></input>
            <div className={styles.errorContainer}>
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.btnContainer}>
              <button
                className={
                  inputsFilled() ? styles.sendBtn : styles.sendBtnDisabled
                }
                disabled={!inputsFilled()}
                onClick={() => {
                  sendLogin();
                }}
              >
                {isUpdateUserMode()
                  ? 'עדכן פרטים'
                  : authType
                  ? 'צור משתמש'
                  : 'התחבר'}
              </button>
              {isUpdateUserMode() && (
                <button
                  onClick={() => {
                    handleClose();
                  }}
                  className={styles.sendBtn}
                >
                  סגור
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
