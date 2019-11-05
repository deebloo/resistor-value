import { createComponent, ElementInstance } from '@lit-kit/component';

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
