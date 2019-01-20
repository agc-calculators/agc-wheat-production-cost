/*! Built with http://stenciljs.com */
import { h } from '../agc-wheat-production-cost.core.js';

import { a as validate, b as round, c as mapEnterKey } from './chunk-20c43398.js';

class AgcWheatProductionCost {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.mode = "step";
        this.units = { land: "acre", yield: "bu/acre", wheat: "bu" };
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: e => e.preventDefault(), ref: c => (this.form = c), "data-wizard": "agc-wheat-production-cost", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "0" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.market-price" }, "Estimated Market Price"),
                        h("input", { name: "marketPrice", type: "number", required: true, min: "1", step: ".01" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.market-price.required", "data-validates": "marketPrice" }, "Please enter a price."),
                        h("p", { "data-i18n": `hints.market-price.${this.units["wheat"]}` }, "\u2BA4 Enter the expected market price for wheat per bushel.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === "step" && (h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")))),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.planted-acres" }, "Planted Acres"),
                        h("input", { name: "plantedAcres", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.planted-acres.required", "data-validates": "plantedAcres" }, "Please enter a whole number of 1 or more."),
                        h("p", { "data-i18n": `hints.planted-acres.${this.units["land"]}` }, "\u2BA4 Enter total number of planted acres.")),
                    h("div", null, this.mode === "step" && [
                        h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")
                    ])),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.expected-yield" }, "Expected Yield"),
                        h("input", { name: "expectedYield", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.expected-yield.required", "data-validates": "expectedYield" }, "Please enter a whole number of zero or greater."),
                        h("p", { "data-i18n": `hints.expected-yield.${this.units["yield"]}` }, "\u2BA4 Enter the expected yield in bushels per acre.")),
                    h("div", null, this.mode === "step" && [
                        h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")
                    ])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": `fields.variable-costs.${this.units["land"]}` }, "Variable Costs per Acre"),
                        h("input", { name: "variableCosts", type: "number", required: true, min: "0", step: ".01" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.variable-costs.required", "data-validates": "variableCosts" }, "Please enter a cost."),
                        h("p", { "data-i18n": `hints.variable-costs.${this.units["land"]}` }, "\u2BA4 Enter the total amount of all variable costs per acre.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === "step" && (h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back")),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === "step" ? 1 : 4) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
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
        let focused = this.form.querySelector(":focus");
        if (!focused.classList.contains("agc-wizard__actions-next")) {
            return;
        }
        if (this.mode === "full") {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === "step") {
            this.cache["sections"][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache["sections"].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let marketPrice = parseFloat(this.form.querySelector('[name="marketPrice"').value);
        let expectedYield = parseInt(this.form.querySelector('[name="expectedYield"')
            .value);
        let plantedAcres = parseInt(this.form.querySelector('[name="plantedAcres"')
            .value);
        let variableCosts = parseFloat(this.form.querySelector('[name="variableCosts"')
            .value);
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
                results: Object.assign({}, results)
            });
        }
        this.results = Object.assign({}, results);
        this.cache["results"].forEach(result => {
            result.style.display = "block";
        });
    }
    handleAction(e) {
        if (e.detail["action"] === "reset") {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll("[data-wizard-section]"))
            .map(c => c)
            .map(c => c);
        var results = Array.from(this.form.querySelectorAll("[data-wizard-results]"))
            .map(c => c)
            .map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener("agcAction", this.handleAction.bind(this));
        this.enterKeyHandler = mapEnterKey(this.form);
        window.document.addEventListener("keydown", this.enterKeyHandler, false);
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener("agcAction", this.handleAction);
        window.document.removeEventListener("keydown", this.enterKeyHandler);
    }
    static get is() { return "agc-wheat-production-cost"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

export { AgcWheatProductionCost };
