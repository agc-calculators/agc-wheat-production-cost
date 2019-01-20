import { Component, Prop, State } from "@stencil/core";
import { parseMoney } from "../../utils";

@Component({
  tag: "agc-wheat-production-cost-inputs"
})
export class AgcWheatProductionCostInputs {
  @Prop() socket: string = "";
  @State() data: any;
  @State() ready: boolean = false;
  section: HTMLElement;

  render() {
    return (
      <section data-wizard-results ref={c => (this.section = c as HTMLElement)}>
        <div style={{ display: this.ready ? "none" : "block" }}>
          <slot name="empty" />
        </div>

        <div style={{ display: this.ready ? "block" : "none" }}>
          {this.data && (
            <ul class="agc-results">
              <li>
                <h2 data-i18n="results.market-price">Estimated Market Price</h2>
                <span class="agc-results__value">
                  ${parseMoney(this.data["marketPrice"]).dollars}
                </span>
                <sub>
                  <strong>.{parseMoney(this.data["marketPrice"]).cents}</strong>
                </sub>
              </li>
              <li>
                <h2
                  data-i18n={`results.planted-acres-${
                    this.data["units"]["land"]
                  }`}
                >
                  Planted Acres
                </h2>
                <span class="agc-results__value">
                  {this.data["plantedAcres"]}
                </span>
                <sub>{this.data["units"]["land"]}</sub>
              </li>
              <li>
                <h2 data-i18n="results.expectedYield">Expected Yield</h2>
                <span class="agc-results__value">
                  {this.data["expectedYield"]}
                </span>
                <sub>{this.data["units"]["yield"]}</sub>
              </li>
              <li>
                <h2
                  data-i18n={`results.variable-costs.${
                    this.data["units"]["land"]
                  }`}
                >
                  Variable Cost per Acre
                </h2>
                <span class="agc-results__value">
                  ${parseMoney(this.data["variableCosts"]).dollars}
                </span>
                <sub>
                  <strong>
                    .{parseMoney(this.data["variableCosts"]).cents}
                  </strong>
                </sub>
              </li>
            </ul>
          )}
        </div>
      </section>
    );
  }

  handleResults(e: CustomEvent) {
    if (e.detail["socket"] !== this.socket) {
      return;
    }
    this.data = { ...e.detail["results"] };
    this.ready = true;
  }

  componentDidLoad() {
    // Global events allow the control to be separated from the form...
    if (!this.socket) {
      return;
    }
    window.document.addEventListener(
      "agcCalculated",
      this.handleResults.bind(this)
    );
  }

  componentDidUnload() {
    window.document.removeEventListener("agcCalculated", this.handleResults);
  }
}
