import { Card } from '../card';
import { Criminal } from '../criminal';

export const CriminalCard = () => {
  return (
    <Card title="🚷פושעים">
      <ul>
        <li>
          <Criminal></Criminal>
        </li>
        <li>
          <Criminal></Criminal>
        </li>
        <li>
          <Criminal></Criminal>
        </li>
        <li>
          <Criminal></Criminal>
        </li>
      </ul>
    </Card>
  );
};
