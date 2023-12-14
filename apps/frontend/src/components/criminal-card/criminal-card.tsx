import Criminal from '../criminal/criminal';

/* eslint-disable-next-line */
export interface CriminalCardProps {}

export function CriminalCard(props: CriminalCardProps) {
  return (
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
  );
}

export default CriminalCard;
