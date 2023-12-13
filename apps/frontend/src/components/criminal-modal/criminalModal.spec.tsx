import { render } from '@testing-library/react';

import CriminalModal from './criminalModal';

describe('CriminalModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CriminalModal />);
    expect(baseElement).toBeTruthy();
  });
});
