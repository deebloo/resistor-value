import { createComponent, ElementInstance } from '@ts-kit/lit-framework';

import { AppComponent, AppComponentState } from './app.component';

describe('Text Component', () => {
  let el: ElementInstance<AppComponentState>;

  beforeEach(() => {
    el = createComponent<AppComponentState, AppComponent>(AppComponent);
  });

  it('should work', () => {
    expect(el).toBeTruthy();

    console.log(el.shadowRoot);
  });
});
