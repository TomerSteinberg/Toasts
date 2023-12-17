import { CriminalCard } from '../components/criminal-card';
import { LeaderboardCard } from '../components/leaderboard-card';
import { Options } from '../components/options';
import { ToastCard } from '../components/toast-card';
import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles.container}>
      <CriminalCard />
      <LeaderboardCard />
      <ToastCard />
      <Options />
    </div>
  );
};

export default App;
