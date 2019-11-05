import {
  Component,
  ElRef,
  Handle,
  Prop,
  State,
  ComponentState,
  OnPropChanges
} from '@lit-kit/component';
import { html } from 'lit-html';

import { ResistorBand } from './resistor.service';

interface SelectBandCountComponentState {
  bandLimit: number;
  selectedBands: ResistorBand[];
}

@Component<SelectBandCountComponentState>({
  tag: 'select-band-count',
  defaultState: { bandLimit: 0, selectedBands: [] },
  style: html`
    <style>
      :host {
        display: block;
        position: relative;
      }

      res-animator {
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        top: 0;
      }

      button {
        background: var(--color-primary);
        border: none;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        padding: 1rem;
        cursor: pointer;
        color: #fff;
        font-size: 1rem;
        display: block;
        width: 100%;
        margin-bottom: 1rem;
        border-radius: 0.4rem;
      }

      .band-buttons {
        display: flex;
      }

      .band-buttons button {
        flex-grow: 1;
        margin-right: 1rem;
        margin-bottom: 0;
      }

      .band-buttons button:last-child {
        margin-right: 0;
      }

      .scale-in {
        animation: scale-in 0.3s;
      }

      @keyframes scale-in {
        0% {
          transform: scale(0.3);
          opacity: 0;
        }

        100% {
          transform: translateY(1);
          opacity: 1;
        }
      }
    </style>
  `,
  template(state, run) {
    return html`
      ${state.bandLimit
        ? html`
            <button class="scale-in" @click=${run('BAND_SELECTED', 0)}>clear</button>
          `
        : html`
            <div class="band-buttons scale-in">
              <button @click=${run('BAND_SELECTED', 4)}>4 Bands</button>
              <button @click=${run('BAND_SELECTED', 5)}>5 Bands</button>
              <button @click=${run('BAND_SELECTED', 6)}>6 Bands</button>
            </div>
          `}
    `;
  }
})
export class SelectBandCountComponent implements OnPropChanges, SelectBandCountComponentState {
  @Prop() bandLimit!: number;
  @Prop() selectedBands: ResistorBand[] = [];

  constructor(
    @ElRef() private elRef: HTMLElement,
    @State() private state: ComponentState<SelectBandCountComponentState>
  ) {}

  onPropChanges() {
    this.state.setState(() => ({
      bandLimit: this.bandLimit,
      selectedBands: this.selectedBands
    }));
  }

  @Handle('BAND_SELECTED') onBandSelected(_: Event, detail: number) {
    this.elRef.dispatchEvent(new CustomEvent('band_count_selected', { detail }));
  }
}
