import { createComponent, ElementInstance } from '@lit-kit/component';

import { SelectBandColorComponent, SelectBandColorCompState } from './select-band-color.component';

describe('SelectBandColorComponent', () => {
  let el: ElementInstance<SelectBandColorCompState>;

  beforeEach(() => {
    el = createComponent<SelectBandColorCompState>(SelectBandColorComponent);
  });

  it('should work', () => {
    expect(el).toBeTruthy();

    console.log(el.shadowRoot);
  });
});
