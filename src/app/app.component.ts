import './select-band-count.component';
import './resistor.component';
import './select-band-color.component';

import { Component, State, CompState, Handle, OnInit } from '@lit-kit/component';
import { html } from 'lit-html';

import { ResistorService, Resistor, ResistorBand } from './resistor.service';

export interface AppCompState {
  bands: ResistorBand[];
  selectedBands: ResistorBand[];
  availableBands: ResistorBand[];
  bandLimit: number;
  displayColors: boolean;
  resistorValue?: string;
}

@Component<AppCompState>({
  tag: 'app-root',
  defaultState: {
    bandLimit: 0,
    bands: [],
    selectedBands: [],
    availableBands: [],
    displayColors: false
  },
  style: html`
    <style>
      select-band-color {
        position: absolute;
        top: 20rem;
        left: 0;
        right: 0;
        bottom: 0;
      }

      resistor-value {
        margin: 1.3rem 0;
      }

      select-band-count {
        margin: 0 1rem;
      }

      .value {
        text-align: center;
        font-size: 2rem;
      }

      .slide-up {
        animation: slide-up 0.2s;
        transform: translateY(0);
        display: block;
      }

      .slide-down {
        animation: slide-down 0.2s;
        transform: translateY(150%);
      }

      @keyframes slide-up {
        0% {
          transform: translateY(100%);
        }

        100% {
          transform: translateY(0);
        }
      }

      @keyframes slide-down {
        0% {
          display: block;
          transform: translateY(0);
        }

        100% {
          display: none;
          transform: translateY(100%);
        }
      }
    </style>
  `,
  template(state, run) {
    return html`
      <div class="value">
        ${state.displayColors
          ? state.selectedBands.length < state.bandLimit
            ? html`
                <span>${state.selectedBands.length}/${state.bandLimit} Bands</span>
              `
            : html`
                <span>${state.resistorValue} &#8486;</span>
              `
          : html`
              <span>Select Resistor Bands</span>
            `}
      </div>

      <resistor-value .bands=${state.selectedBands}></resistor-value>

      <select-band-count
        .bandLimit=${state.bandLimit}
        .selectedBands=${state.selectedBands}
        @band_count_selected=${run('BAND_COUNT_SELECTED')}
      ></select-band-count>

      <select-band-color
        class="${state.displayColors ? 'slide-up' : 'slide-down'}"
        .bands=${state.availableBands}
        @band_selected=${run('BAND_SELECTED')}
      ></select-band-color>
    `;
  }
})
export class AppComponent implements OnInit {
  constructor(
    @Resistor() private resistor: ResistorService,
    @State() private state: CompState<AppCompState>
  ) {}

  onInit() {
    const bands = this.resistor.getResistorBands();

    this.state.setState({ ...this.state.value, bands });
  }

  @Handle('BAND_COUNT_SELECTED') onBandCountSelected(e: CustomEvent<number>): void {
    const bandLimit = e.detail;

    this.state.setState({
      ...this.state.value,
      selectedBands: [],
      resistorValue: undefined,
      bandLimit,
      displayColors: bandLimit > 0,
      availableBands: this.getAvailableBands([], bandLimit)
    });
  }

  @Handle('BAND_SELECTED') onBandSelected(e: CustomEvent<ResistorBand>): void {
    if (this.state.value.selectedBands.length >= this.state.value.bandLimit) {
      return void 0;
    }

    const selectedBands = [...this.state.value.selectedBands, e.detail];

    this.state.setState({
      ...this.state.value,
      selectedBands,
      availableBands: this.getAvailableBands(selectedBands, this.state.value.bandLimit),
      resistorValue: this.resistor.getResistorValue(selectedBands, this.state.value.bandLimit)
    });
  }

  private getAvailableBands(selectedBands: ResistorBand[], bandLimit: number): ResistorBand[] {
    if (selectedBands.length + 1 === bandLimit - 1) {
      return this.resistor.getMultiplierBands();
    } else if (selectedBands.length + 1 === bandLimit) {
      return this.resistor.getToleranceBands();
    }

    return this.resistor.getValueBands();
  }
}
