import {
  Component,
  ElRef,
  Handle,
  Prop,
  State,
  ComponentState,
  OnPropChanges
} from '@ts-kit/lit-framework';
import { html } from 'lit-html';

import { ResistorBand } from './resistor.service';

export interface SelectBandColorComponentState {
  bands: ResistorBand[];
}

@Component<SelectBandColorComponentState>({
  tag: 'select-band-color',
  defaultState: { bands: [] },
  style: html`
    <style>
      :host {
        display: block;
        position: relative;
        padding: 0.5rem 0;
        background: #fff;
        box-shadow: 0 -7px 6px rgba(0, 0, 0, 0.05);
        overflow-y: auto;
      }

      button {
        align-items: center;
        background: none;
        font-size: 1rem;
        display: flex;
        padding: 0.5rem 1rem;
        border: none;
        width: 100%;
        cursor: pointer;
      }

      .color-block {
        border-radius: 10px;
        height: 2rem;
        width: 5rem;
        display: inline-block;
        margin-right: 1rem;
      }
    </style>
  `,
  template(state, run) {
    return html`
      ${state.bands.map(band => {
        return html`
          <button @click=${run('BAND_SELECTED', band)}>
            <div class="color-block" .style="background: ${band.color}"></div>

            <span>${band.color}</span>
          </button>
        `;
      })}
    `;
  }
})
export class SelectBandColorComponent implements OnPropChanges, SelectBandColorComponentState {
  @Prop() bands: ResistorBand[] = [];

  constructor(
    @ElRef() private elRef: HTMLElement,
    @State() private state: ComponentState<SelectBandColorComponentState>
  ) {}

  onPropChanges() {
    this.state.setState(() => ({ bands: this.bands }));
  }

  @Handle('BAND_SELECTED') onBandSelected(_: Event, detail: number) {
    this.elRef.dispatchEvent(new CustomEvent('band_selected', { detail }));
  }
}
