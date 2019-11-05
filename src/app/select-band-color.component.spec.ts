import { createComponent, ElementInstance } from '@lit-kit/component';

import {
  SelectBandColorComponent,
  SelectBandColorComponentState
} from './select-band-color.component';

describe('SelectBandColorComponent', () => {
  let el: ElementInstance<SelectBandColorComponentState>;

  beforeEach(() => {
    el = createComponent<SelectBandColorComponentState, SelectBandColorComponent>(
      SelectBandColorComponent
    );
  });

  it('should work', () => {
    expect(el).toBeTruthy();

    console.log(el.shadowRoot);
  });
});
