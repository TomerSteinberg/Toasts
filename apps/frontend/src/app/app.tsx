import { CriminalCard } from '../components/criminal-card';
import { LeaderboardCard } from '../components/leaderboard-card';
import { Options } from '../components/options';
import { ToastCard } from '../components/toast-card';
import styles from './app.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const App = () => {
  return (
    <div className={styles.container}>
      <CriminalCard />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastCard />
      </LocalizationProvider>
      <LeaderboardCard />
      <Options />
    </div>
  );
};

export default App;
