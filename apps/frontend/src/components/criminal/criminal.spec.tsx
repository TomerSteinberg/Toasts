import { render } from '@testing-library/react';

import Criminal from './criminal';

describe('Criminal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Criminal />);
    expect(baseElement).toBeTruthy();
  });
});
