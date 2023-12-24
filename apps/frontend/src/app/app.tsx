import { CriminalCard } from '../components/criminal-card';
import { LeaderboardCard } from '../components/leaderboard-card';
import { Options } from '../components/options';
import { ToastCard } from '../components/toast-card';
import styles from './app.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserModal } from '../components/user-modal';
import { useState } from 'react';

export const App = () => {
  const [loggedOut, setLoggedOut] = useState(true);
  return (
    <div className={styles.container}>
      <UserModal openModal={loggedOut} setOpenModal={setLoggedOut} />
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
