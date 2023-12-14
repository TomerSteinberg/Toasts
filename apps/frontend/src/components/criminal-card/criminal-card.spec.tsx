import { render } from '@testing-library/react';

import CriminalCard from './criminal-card';

describe('CriminalCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CriminalCard />);
    expect(baseElement).toBeTruthy();
  });
});
