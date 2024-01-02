import { Card } from '../card';
import { Criminal } from '../criminal';
import { useGetCriminalsQuery } from '../../store/services';
import styles from './criminal-card.module.css';

export const CriminalCard = () => {
  const { data: criminals } = useGetCriminalsQuery();

  return (
    <Card title="🚷פושעים" width="25vw" height="95vh">
      <div className={styles.emptyContainer}></div>
      <ul className={styles.criminalList}>
        {!criminals || criminals.length === 0 ? (
          <li>
            <p className={styles.empty}>אין פושעים</p>
          </li>
        ) : (
          criminals.map(({ id, users, criminalType }) => {
            return (
              <li key={id}>
                <Criminal
                  username={users.username}
                  type={criminalType}
                  id={id}
                />
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};
