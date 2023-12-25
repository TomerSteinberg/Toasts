import { CriminalCard } from '../components/criminal-card';
import { LeaderboardCard } from '../components/leaderboard-card';
import { Options } from '../components/options';
import { ToastsCard } from '../components/toasts-card';
import styles from './app.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserModal } from '../components/user-modal';
import { useState } from 'react';

export const App = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  return (
    <div className={styles.container}>
      <UserModal isOpen={isLoggedOut} setIsOpen={setIsLoggedOut} />
      <CriminalCard />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastsCard />
      </LocalizationProvider>
      <LeaderboardCard />
      <Options />
    </div>
  );
};

export default App;
