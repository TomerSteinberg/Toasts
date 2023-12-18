import styles from './criminal.module.css';

export interface Props {
  username: string;
  type: boolean;
}

export const Criminal: React.FC<Props> = ({ username, type }) => {
  return (
    <div className={styles.container}>
      <p>{username}</p>
      <p>{type ? 'פרסונה נון גרטה' : 'פושע רגיל'}</p>
    </div>
  );
};
