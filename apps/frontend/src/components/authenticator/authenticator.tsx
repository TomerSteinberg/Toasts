import styles from './authenticator.module.css';

/* eslint-disable-next-line */
export interface AuthenticatorProps {}

export const Authenticator = (props: AuthenticatorProps) => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Authenticator!</h1>
    </div>
  );
};
