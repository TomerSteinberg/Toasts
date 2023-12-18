import { Card } from '../card';
import { Criminal } from '../criminal';
import { useGetCriminalsQuery } from '../../store/services/criminal.api';

export const CriminalCard = () => {
  const { data: criminals } = useGetCriminalsQuery();

  return (
    <Card title="🚷פושעים">
      <ul>
        {criminals?.map((criminal) => {
          return (
            <li key={criminal.id}>
              <Criminal
                username={criminal.users.username}
                type={criminal.criminalType}
              ></Criminal>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
