import { render } from '@testing-library/react';

import UiRace from './ui-race';

describe('UiRace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiRace />);
    expect(baseElement).toBeTruthy();
  });
});
