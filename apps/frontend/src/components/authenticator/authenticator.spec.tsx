import { render } from '@testing-library/react';

import Authenticator from './authenticator';

describe('Authenticator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Authenticator />);
    expect(baseElement).toBeTruthy();
  });
});
