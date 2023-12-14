import { render } from '@testing-library/react';

import LeaderboardCard from './leaderboard-card';

describe('LeaderboardCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaderboardCard />);
    expect(baseElement).toBeTruthy();
  });
});
