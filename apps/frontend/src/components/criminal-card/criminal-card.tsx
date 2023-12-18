import { Card } from '../card';
import { Criminal } from '../criminal';
import { useGetCriminalsQuery } from '../../store/services/criminal.api';
import styles from './criminal-card.module.css';

export const CriminalCard = () => {
  const { data: criminals } = useGetCriminalsQuery();

  return (
    <Card title="🚷פושעים">
      <ul>
        {criminals === undefined || criminals.length === 0 ? (
          <li>
            <h1 className={styles.empty}>אין</h1>
          </li>
        ) : (
          criminals.map((criminal) => {
            return (
              <li key={criminal.id}>
                <Criminal
                  username={criminal.users.username}
                  type={criminal.criminalType}
                ></Criminal>
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};
