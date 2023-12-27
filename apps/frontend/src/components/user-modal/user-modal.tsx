import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './user-modal.module.css';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import {
  useLoginMutation,
  useUpdateUserMutation,
  useSignupMutation,
} from '../../store/services/user.api';
import { Login } from '../../types/login.type';

export interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  username?: string;
  password?: string;
}

export const UserModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  username,
  password,
}) => {
  const LOGIN = false;
  const SIGNUP = true;

  const [loginTrigger, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const [updateUser] = useUpdateUserMutation();

  const [signupTrigger] = useSignupMutation();

  const isUpdateUserMode = (): boolean => {
    return username !== undefined && password !== undefined;
  };

  const [usernameIn, setUsernameIn] = useState(
    username !== undefined ? username : ''
  );
  const [passwordIn, setPasswordIn] = useState(
    password !== undefined ? password : ''
  );

  const [error, setError] = useState('');
  const [authType, setAuthType] = useState(LOGIN);

  const handleClose = () => {
    if (username && password) {
      setUsernameIn(username);
      setPasswordIn(password);
    }
    setIsOpen(false);
  };

  const sendLogin = async () => {
    if (usernameIn && passwordIn) {
      const loginParams: Login = { username: usernameIn, password: passwordIn };
      await loginTrigger(loginParams)
        .unwrap()
        .then(() => {
          handleClose();
        })
        .catch((error: { data: { message: string } }) =>
          setError(error.data.message)
        );
    }
  };

  const sendSignup = async () => {
    if (usernameIn && passwordIn) {
      const signupParams: Login = {
        username: usernameIn,
        password: passwordIn,
      };
      await signupTrigger(signupParams)
        .unwrap()
        .then(() => {
          loginTrigger(signupParams)
            .unwrap()
            .then(() => {
              handleClose();
            });
        })
        .catch((error: { data: { message: string } }) => {
          setError(error.data.message);
          return;
        });
    }
  };

  const sendUpdate = async () => {
    if (usernameIn && passwordIn && result.data) {
      await updateUser({
        id: result.data.id,
        username: usernameIn,
        password: passwordIn,
      })
        .unwrap()
        .then(() => {
          loginTrigger({ username: usernameIn, password: passwordIn });
          handleClose();
        })
        .catch((error: { data: { message: string } }) => {
          setError(error.data.message);
        });
    }
  };

  useEffect(() => {
    setPasswordIn(password !== undefined ? password : '');
    setUsernameIn(username !== undefined ? username : '');
  }, [isOpen]);

  const inputsFilled = (): boolean => {
    return (
      usernameIn !== undefined &&
      passwordIn !== undefined &&
      passwordIn.length > 8
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
        open={isOpen}
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
            <div>
              <h2>פרטי משתמש</h2>
            </div>
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
            <div className={styles.ButtonContainer}>
              <button
                className={
                  inputsFilled() ? styles.sendButton : styles.sendButtonDisabled
                }
                disabled={!inputsFilled()}
                onClick={() => {
                  isUpdateUserMode()
                    ? sendUpdate()
                    : authType
                    ? sendSignup()
                    : sendLogin();
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
                  className={styles.sendButton}
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
