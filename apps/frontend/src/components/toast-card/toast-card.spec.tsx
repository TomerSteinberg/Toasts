import { render } from '@testing-library/react';

import ToastCard from './toast-card';

describe('ToastCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToastCard />);
    expect(baseElement).toBeTruthy();
  });
});
