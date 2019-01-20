import { Component, Prop, State } from "@stencil/core";
import { parseMoney } from "../../utils";

@Component({
  tag: "agc-wheat-production-cost-results"
})
export class AgcWheatProductionCostResults {
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
                <h2 data-i18n="results.total-income">Gross Income per Acre</h2>
                <span class="agc-results__value">
                  ${parseMoney(this.data["totalIncomePerAcre"]).dollars}
                </span>
                <sub>
                  <strong>
                    .{parseMoney(this.data["totalIncomePerAcre"]).cents}
                  </strong>
                </sub>
              </li>
              <li>
                <h2 data-i18n="results.net-income-per-acre">
                  Net Income per Acre
                </h2>
                <span class="agc-results__value">
                  ${parseMoney(this.data["netIncomePerAcre"]).dollars}
                </span>
                <sub>
                  <strong>
                    .{parseMoney(this.data["netIncomePerAcre"]).cents}
                  </strong>
                </sub>
              </li>
              <li>
                <h2
                  data-i18n={`results.net-income-total.${
                    this.data["units"]["land"]
                  }`}
                >
                  Net Income - {this.data["plantedAcres"]} acres
                </h2>
                <span class="agc-results__value">
                  ${parseMoney(this.data["netIncomeTotal"]).dollars}
                </span>
                <sub>
                  <strong>
                    .{parseMoney(this.data["netIncomeTotal"]).cents}
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
