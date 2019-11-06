import { createComponent, ElementInstance } from '@lit-kit/component';

import { AppComponent, AppCompState } from './app.component';

describe('Text Component', () => {
  let el: ElementInstance<AppCompState>;

  beforeEach(() => {
    el = createComponent<AppCompState>(AppComponent);
  });

  it('should work', () => {
    expect(el).toBeTruthy();

    console.log(el.shadowRoot);
  });
});
