/*! Built with http://stenciljs.com */
import { h } from '../agc-wheat-production-cost.core.js';

import { d as parseMoney } from './chunk-20c43398.js';

class AgcWheatProductionCostInputs {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => (this.section = c) },
            h("div", { style: { display: this.ready ? "none" : "block" } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? "block" : "none" } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.market-price" }, "Estimated Market Price"),
                    h("span", { class: "agc-results__value" },
                        "$",
                        parseMoney(this.data["marketPrice"]).dollars),
                    h("sub", null,
                        h("strong", null,
                            ".",
                            parseMoney(this.data["marketPrice"]).cents))),
                h("li", null,
                    h("h2", { "data-i18n": `results.planted-acres-${this.data["units"]["land"]}` }, "Planted Acres"),
                    h("span", { class: "agc-results__value" }, this.data["plantedAcres"]),
                    h("sub", null, this.data["units"]["land"])),
                h("li", null,
                    h("h2", { "data-i18n": "results.expectedYield" }, "Expected Yield"),
                    h("span", { class: "agc-results__value" }, this.data["expectedYield"]),
                    h("sub", null, this.data["units"]["yield"])),
                h("li", null,
                    h("h2", { "data-i18n": `results.variable-costs.${this.data["units"]["land"]}` }, "Variable Cost per Acre"),
                    h("span", { class: "agc-results__value" },
                        "$",
                        parseMoney(this.data["variableCosts"]).dollars),
                    h("sub", null,
                        h("strong", null,
                            ".",
                            parseMoney(this.data["variableCosts"]).cents))))))));
    }
    handleResults(e) {
        if (e.detail["socket"] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail["results"]);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener("agcCalculated", this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener("agcCalculated", this.handleResults);
    }
    static get is() { return "agc-wheat-production-cost-inputs"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}

export { AgcWheatProductionCostInputs };
