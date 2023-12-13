import { render } from '@testing-library/react';

import ToastModal from './toast-modal';

describe('ToastModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToastModal />);
    expect(baseElement).toBeTruthy();
  });
});
