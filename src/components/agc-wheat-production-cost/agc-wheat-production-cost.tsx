import { Component, State, Event, EventEmitter, Prop } from "@stencil/core";
import { validate, round, mapEnterKey } from "../../utils";

@Component({
  tag: "agc-wheat-production-cost"
})
export class AgcWheatProductionCost {
  @Prop() socket: string = "";
  @Prop() tract: string = "";
  @Prop() mode: "full" | "step" = "step";
  @Prop() units: any = { land: "acre", yield: "bu/acre", wheat: "bu" };
  @State() currentStep = 0;
  @State() cache = {};
  @State() submitted = false;
  @State() results = {};
  @Event({
    eventName: "agcCalculated"
  })
  agcCalculated: EventEmitter;
  @Event({
    eventName: "agcStepChanged"
  })
  agcStepChanged: EventEmitter;

  form: HTMLFormElement;
  enterKeyHandler: (e: KeyboardEvent) => void;

  render() {
    return (
      <div>
        <form
          onSubmit={e => e.preventDefault()}
          ref={c => (this.form = c as HTMLFormElement)}
          data-wizard="agc-wheat-production-cost"
          data-wizard-mode={this.mode}
          class="agc-wizard"
        >
          <slot />
          <section data-wizard-section="0">
            <div class="agc-wizard__field">
              <label data-i18n="fields.market-price">
                Estimated Market Price
              </label>
              <input
                name="marketPrice"
                type="number"
                required
                min="1"
                step=".01"
              />
              <p
                class="agc-wizard__validation-message"
                data-i18n="validation.market-price.required"
                data-validates="marketPrice"
              >
                Please enter a price.
              </p>
              <p data-i18n={`hints.market-price.${this.units["wheat"]}`}>
                ⮤ Enter the expected market price for wheat per bushel.
              </p>
            </div>
            <div class="agc-wizard__actions">
              {this.mode === "step" && (
                <button
                  class="agc-wizard__actions-next"
                  data-i18n="actions.next"
                  onClick={this.nextPrev.bind(this, 1)}
                >
                  Next 🠖
                </button>
              )}
            </div>
          </section>
          <section data-wizard-section="1">
            <div class="agc-wizard__field">
              <label data-i18n="fields.planted-acres">Planted Acres</label>
              <input
                name="plantedAcres"
                type="number"
                required
                min="1"
                step="1"
              />
              <p
                class="agc-wizard__validation-message"
                data-i18n="validation.planted-acres.required"
                data-validates="plantedAcres"
              >
                Please enter a whole number of 1 or more.
              </p>
              <p data-i18n={`hints.planted-acres.${this.units["land"]}`}>
                ⮤ Enter total number of planted acres.
              </p>
            </div>
            <div>
              {this.mode === "step" && [
                <button
                  class="agc-wizard__actions-back"
                  data-i18n="actions.back"
                  onClick={this.nextPrev.bind(this, -1)}
                >
                  🠔 Back
                </button>,
                <button
                  class="agc-wizard__actions-next"
                  data-i18n="actions.next"
                  onClick={this.nextPrev.bind(this, 1)}
                >
                  Next 🠖
                </button>
              ]}
            </div>
          </section>
          <section data-wizard-section="2">
            <div class="agc-wizard__field">
              <label data-i18n="fields.expected-yield">Expected Yield</label>
              <input
                name="expectedYield"
                type="number"
                required
                min="1"
                step="1"
              />
              <p
                class="agc-wizard__validation-message"
                data-i18n="validation.expected-yield.required"
                data-validates="expectedYield"
              >
                Please enter a whole number of zero or greater.
              </p>
              <p data-i18n={`hints.expected-yield.${this.units["yield"]}`}>
                ⮤ Enter the expected yield in bushels per acre.
              </p>
            </div>
            <div>
              {this.mode === "step" && [
                <button
                  class="agc-wizard__actions-back"
                  data-i18n="actions.back"
                  onClick={this.nextPrev.bind(this, -1)}
                >
                  🠔 Back
                </button>,
                <button
                  class="agc-wizard__actions-next"
                  data-i18n="actions.next"
                  onClick={this.nextPrev.bind(this, 1)}
                >
                  Next 🠖
                </button>
              ]}
            </div>
          </section>
          <section data-wizard-section="3">
            <div class="agc-wizard__field">
              <label data-i18n={`fields.variable-costs.${this.units["land"]}`}>
                Variable Costs per Acre
              </label>
              <input
                name="variableCosts"
                type="number"
                required
                min="0"
                step=".01"
              />
              <p
                class="agc-wizard__validation-message"
                data-i18n="validation.variable-costs.required"
                data-validates="variableCosts"
              >
                Please enter a cost.
              </p>
              <p data-i18n={`hints.variable-costs.${this.units["land"]}`}>
                ⮤ Enter the total amount of all variable costs per acre.
              </p>
            </div>
            <div class="agc-wizard__actions">
              {this.mode === "step" && (
                <button
                  class="agc-wizard__actions-back"
                  data-i18n="actions.back"
                  onClick={this.nextPrev.bind(this, -1)}
                >
                  🠔 Back
                </button>
              )}
              <button
                class="agc-wizard__actions-next"
                data-i18n="actions.finish"
                onClick={this.nextPrev.bind(this, this.mode === "step" ? 1 : 4)}
              >
                Calculate 🠖
              </button>
            </div>
          </section>
          <section data-wizard-results>
            <slot name="results" />
          </section>
        </form>
      </div>
    );
  }

  showTab(n) {
    // This function will display the specified section of the form...
    if (this.mode === "step") {
      this.cache["sections"][n].style.display = "block";
    }

    if (this.socket) {
      this.agcStepChanged.emit({
        socket: this.socket,
        tract: this.tract,
        step: this.currentStep
      });
    }
  }

  reset() {
    this.currentStep = 0;
    this.submitted = false;
    this.showTab(0);
  }

  validateForm() {
    let valid = true;

    if (this.currentStep === 0 || this.mode === "full") {
      if (!validate(this.form, "marketPrice")) {
        valid = false;
      }
    }
    if (this.currentStep === 1 || this.mode === "full") {
      if (!validate(this.form, "plantedAcres")) {
        valid = false;
      }
    }
    if (this.currentStep === 2 || this.mode === "full") {
      if (!validate(this.form, "expectedYield")) {
        valid = false;
      }
    }
    if (this.currentStep === 3 || this.mode === "full") {
      if (!validate(this.form, "variableCosts")) {
        valid = false;
      }
    }
    return valid;
  }

  nextPrev(n, e) {
    e && e.preventDefault();
    let focused = this.form.querySelector(":focus") as HTMLElement;

    if (!focused.classList.contains("agc-wizard__actions-next")) {
      return;
    }

    if (this.mode === "full") {
      if (!this.validateForm()) return false;
    } else if (n == 1 && !this.validateForm()) return false;

    // Hide the current tab:
    if (this.mode === "step") {
      this.cache["sections"][this.currentStep].style.display = "none";
    }
    // Increase or decrease the current tab by 1:
    this.currentStep = this.currentStep + n;
    // if you have reached the end of the form...
    if (this.currentStep >= this.cache["sections"].length) {
      // ... the form gets submitted:
      this.submitted = true;
      this.showResults.call(this);
      return false;
    }
    // Otherwise, display the correct tab:
    this.showTab.call(this, this.currentStep);
  }

  showResults() {
    let marketPrice = parseFloat(
      (this.form.querySelector('[name="marketPrice"') as HTMLInputElement).value
    );
    let expectedYield = parseInt(
      (this.form.querySelector('[name="expectedYield"') as HTMLInputElement)
        .value
    );
    let plantedAcres = parseInt(
      (this.form.querySelector('[name="plantedAcres"') as HTMLInputElement)
        .value
    );
    let variableCosts = parseFloat(
      (this.form.querySelector('[name="variableCosts"') as HTMLInputElement)
        .value
    );

    let totalIncomePerAcre = round(expectedYield * marketPrice, 2);
    let totalExpensesPerAcre = round(variableCosts, 2);
    let netIncomePerAcre = round(totalIncomePerAcre - totalExpensesPerAcre, 2);
    let netIncomeTotal = round(netIncomePerAcre * plantedAcres, 2);
    let totalExpenses = round(totalExpensesPerAcre * plantedAcres, 2);

    let results = {
      socket: this.socket,
      tract: this.tract,
      units: this.units,
      marketPrice,
      expectedYield,
      plantedAcres,
      variableCosts,
      totalIncomePerAcre,
      totalExpensesPerAcre,
      totalExpenses,
      netIncomePerAcre,
      netIncomeTotal,
      calculated: new Date()
    };

    if (this.socket) {
      this.agcCalculated.emit({
        socket: this.socket,
        tract: this.tract,
        results: { ...results }
      });
    }

    this.results = { ...results };

    this.cache["results"].forEach(result => {
      result.style.display = "block";
    });
  }

  handleAction(e: CustomEvent) {
    if (e.detail["action"] === "reset") {
      this.reset();
    }
  }

  componentDidLoad() {
    var sections = Array.from(
      this.form.querySelectorAll("[data-wizard-section]")
    )
      .map(c => c as any)
      .map(c => c as HTMLElement);
    var results = Array.from(
      this.form.querySelectorAll("[data-wizard-results]")
    )
      .map(c => c as any)
      .map(c => c as HTMLElement);
    this.cache = { ...this.cache, sections: sections, results: results };

    window.document.addEventListener("agcAction", this.handleAction.bind(this));

    this.enterKeyHandler = mapEnterKey(this.form);
    window.document.addEventListener("keydown", this.enterKeyHandler, false);

    this.showTab(0);
  }

  componentDidUnload() {
    window.document.removeEventListener("agcAction", this.handleAction);
    window.document.removeEventListener("keydown", this.enterKeyHandler);
  }
}
