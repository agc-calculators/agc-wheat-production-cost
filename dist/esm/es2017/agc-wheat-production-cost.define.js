
// AgcWheatProductionCost: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './agc-wheat-production-cost.core.js';
import {
  AgcWheatProductionCost,
  AgcWheatProductionCostInputs,
  AgcWheatProductionCostProgress,
  AgcWheatProductionCostResults,
  AgcWheatProductionCostResultsPlaceholder
} from './agc-wheat-production-cost.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcWheatProductionCost,
    AgcWheatProductionCostInputs,
    AgcWheatProductionCostProgress,
    AgcWheatProductionCostResults,
    AgcWheatProductionCostResultsPlaceholder
  ], opts);
}
