// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Card from '../components/card/card';
import Toast from '../components/toast/toast';
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <Card title="🚷פושעים"></Card>
      <Card title="🏆לוח תוצאות"></Card>
      <Card title="🍺שתיות קרובות"></Card>
    </div>
  );
}

export default App;
