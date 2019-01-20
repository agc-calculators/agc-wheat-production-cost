import { Component } from "@stencil/core";

@Component({
  tag: "agc-wheat-production-cost-results-placeholder"
})
export class AgcWheatProductionCostResultsPlaceholder {
  render() {
    const placeholder = () => (
      <span>
        <i class="mark" /> <i class="mark" /> <i class="mark" />{" "}
        <i class="mark" />
      </span>
    );

    return (
      <section>
        <ul class="agc-results-placeholder">
          <li>
            <h2 data-i18n="results.total-income">Income</h2>
            {placeholder()}
          </li>
          <li>
            <h2 data-i18n="results.total-expenses">Expenses</h2>
            {placeholder()}
          </li>
          <li>
            <h2 data-i18n="results.net-income-per-acre">Net Income per Acre</h2>
            {placeholder()}
          </li>
          <li>
            <h2 data-i18n="results.net-income-total">Net Income Total</h2>
            {placeholder()}
          </li>
        </ul>
      </section>
    );
  }
}
