import { parseMoney } from "../../utils";
export class AgcWheatProductionCostResults {
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
                    h("h2", { "data-i18n": "results.total-income" }, "Gross Income per Acre"),
                    h("span", { class: "agc-results__value" },
                        "$",
                        parseMoney(this.data["totalIncomePerAcre"]).dollars),
                    h("sub", null,
                        h("strong", null,
                            ".",
                            parseMoney(this.data["totalIncomePerAcre"]).cents))),
                h("li", null,
                    h("h2", { "data-i18n": "results.net-income-per-acre" }, "Net Income per Acre"),
                    h("span", { class: "agc-results__value" },
                        "$",
                        parseMoney(this.data["netIncomePerAcre"]).dollars),
                    h("sub", null,
                        h("strong", null,
                            ".",
                            parseMoney(this.data["netIncomePerAcre"]).cents))),
                h("li", null,
                    h("h2", { "data-i18n": `results.net-income-total.${this.data["units"]["land"]}` },
                        "Net Income - ",
                        this.data["plantedAcres"],
                        " acres"),
                    h("span", { class: "agc-results__value" },
                        "$",
                        parseMoney(this.data["netIncomeTotal"]).dollars),
                    h("sub", null,
                        h("strong", null,
                            ".",
                            parseMoney(this.data["netIncomeTotal"]).cents))))))));
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
    static get is() { return "agc-wheat-production-cost-results"; }
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
