/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface AgcWheatProductionCostInputs {
    'socket': string;
  }
  interface AgcWheatProductionCostInputsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcWheatProductionCostProgress {
    'socket': string;
  }
  interface AgcWheatProductionCostProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcWheatProductionCostResultsPlaceholder {}
  interface AgcWheatProductionCostResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcWheatProductionCostResults {
    'socket': string;
  }
  interface AgcWheatProductionCostResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcWheatProductionCost {
    'mode': "full" | "step";
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcWheatProductionCostAttributes extends StencilHTMLAttributes {
    'mode'?: "full" | "step";
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcWheatProductionCostInputs': Components.AgcWheatProductionCostInputs;
    'AgcWheatProductionCostProgress': Components.AgcWheatProductionCostProgress;
    'AgcWheatProductionCostResultsPlaceholder': Components.AgcWheatProductionCostResultsPlaceholder;
    'AgcWheatProductionCostResults': Components.AgcWheatProductionCostResults;
    'AgcWheatProductionCost': Components.AgcWheatProductionCost;
  }

  interface StencilIntrinsicElements {
    'agc-wheat-production-cost-inputs': Components.AgcWheatProductionCostInputsAttributes;
    'agc-wheat-production-cost-progress': Components.AgcWheatProductionCostProgressAttributes;
    'agc-wheat-production-cost-results-placeholder': Components.AgcWheatProductionCostResultsPlaceholderAttributes;
    'agc-wheat-production-cost-results': Components.AgcWheatProductionCostResultsAttributes;
    'agc-wheat-production-cost': Components.AgcWheatProductionCostAttributes;
  }


  interface HTMLAgcWheatProductionCostInputsElement extends Components.AgcWheatProductionCostInputs, HTMLStencilElement {}
  var HTMLAgcWheatProductionCostInputsElement: {
    prototype: HTMLAgcWheatProductionCostInputsElement;
    new (): HTMLAgcWheatProductionCostInputsElement;
  };

  interface HTMLAgcWheatProductionCostProgressElement extends Components.AgcWheatProductionCostProgress, HTMLStencilElement {}
  var HTMLAgcWheatProductionCostProgressElement: {
    prototype: HTMLAgcWheatProductionCostProgressElement;
    new (): HTMLAgcWheatProductionCostProgressElement;
  };

  interface HTMLAgcWheatProductionCostResultsPlaceholderElement extends Components.AgcWheatProductionCostResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcWheatProductionCostResultsPlaceholderElement: {
    prototype: HTMLAgcWheatProductionCostResultsPlaceholderElement;
    new (): HTMLAgcWheatProductionCostResultsPlaceholderElement;
  };

  interface HTMLAgcWheatProductionCostResultsElement extends Components.AgcWheatProductionCostResults, HTMLStencilElement {}
  var HTMLAgcWheatProductionCostResultsElement: {
    prototype: HTMLAgcWheatProductionCostResultsElement;
    new (): HTMLAgcWheatProductionCostResultsElement;
  };

  interface HTMLAgcWheatProductionCostElement extends Components.AgcWheatProductionCost, HTMLStencilElement {}
  var HTMLAgcWheatProductionCostElement: {
    prototype: HTMLAgcWheatProductionCostElement;
    new (): HTMLAgcWheatProductionCostElement;
  };

  interface HTMLElementTagNameMap {
    'agc-wheat-production-cost-inputs': HTMLAgcWheatProductionCostInputsElement
    'agc-wheat-production-cost-progress': HTMLAgcWheatProductionCostProgressElement
    'agc-wheat-production-cost-results-placeholder': HTMLAgcWheatProductionCostResultsPlaceholderElement
    'agc-wheat-production-cost-results': HTMLAgcWheatProductionCostResultsElement
    'agc-wheat-production-cost': HTMLAgcWheatProductionCostElement
  }

  interface ElementTagNameMap {
    'agc-wheat-production-cost-inputs': HTMLAgcWheatProductionCostInputsElement;
    'agc-wheat-production-cost-progress': HTMLAgcWheatProductionCostProgressElement;
    'agc-wheat-production-cost-results-placeholder': HTMLAgcWheatProductionCostResultsPlaceholderElement;
    'agc-wheat-production-cost-results': HTMLAgcWheatProductionCostResultsElement;
    'agc-wheat-production-cost': HTMLAgcWheatProductionCostElement;
  }


}
