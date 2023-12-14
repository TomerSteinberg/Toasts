// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Card from '../components/card/card';
import CriminalCard from '../components/criminal-card/criminal-card';
import LeaderboardCard from '../components/leaderboard-card/leaderboard-card';
import Options from '../components/options/options';
import ToastCard from '../components/toast-card/toast-card';
import styles from './app.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <Card title="🚷פושעים">
        <CriminalCard />
      </Card>
      <Card title="🏆לוח תוצאות">
        <LeaderboardCard />
      </Card>
      <Card title="🍺שתיות קרובות">
        <ToastCard />
      </Card>
      <Options></Options>
    </div>
  );
}

export default App;
