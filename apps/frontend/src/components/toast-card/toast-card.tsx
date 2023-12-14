import Toast from '../toast/toast';

/* eslint-disable-next-line */
export interface ToastCardProps {}

export function ToastCard(props: ToastCardProps) {
  return (
    <ul>
      <li>
        <Toast></Toast>
      </li>
      <li>
        <Toast></Toast>
      </li>
      <li>
        <Toast></Toast>
      </li>
      <li>
        <Toast></Toast>
      </li>
    </ul>
  );
}

export default ToastCard;
