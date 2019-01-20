/*! Built with http://stenciljs.com */
import { h } from '../agc-wheat-production-cost.core.js';

const validate = (form, name) => {
    let el = form.querySelector(`[name="${name}"]`);
    let message = form.querySelector(`[data-validates="${name}"`);
    if (!el.checkValidity()) {
        if (el.className.indexOf('invalid') === -1) {
            el.className += " invalid";
        }
        message.style.display = 'block';
        return false;
    }
    else {
        el.className = el.className.replace(" invalid", "");
        message.style.display = 'none';
    }
    return true;
};
const matches = (el, selector) => {
    return el.matches.call(el, selector);
};
const mapEnterKey = (form) => {
    return (e) => {
        let self = document.querySelector(':focus');
        let elements = Array.from(form.querySelectorAll('input, a, select, button, textarea')).map(c => c);
        if (!self || self.classList.contains('agc-wizard__actions-next')) {
            return;
        }
        const enterKey = () => {
            if (e.which === 13 && !matches(self, 'textarea')) {
                if (elements.indexOf(self) && !matches(self, 'a') && !matches(self, 'button')) {
                    e.preventDefault();
                }
                var next = elements[elements.indexOf(self) + (e.shiftKey ? -1 : 1)];
                if (next) {
                    next.focus();
                }
                else {
                    elements[0].focus();
                }
                let inp = next;
                if (inp && 'select' in inp) {
                    inp.select();
                }
                let prevInp = self;
                if (prevInp && prevInp.willValidate) {
                    validate(form, prevInp.name);
                }
            }
        };
        enterKey();
    };
};
const round = (num, places) => {
    return +(Math.round(new Number(`${num}e+${places}`).valueOf()) + "e-" + places);
};
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const parseMoney = (x) => {
    let parts = x.toFixed(2).toString().split(".");
    let change = parts[1];
    let dollars = numberWithCommas(parts[0]) || '0';
    return {
        dollars: dollars,
        cents: change,
        toString: (sign = '$') => {
        }
    };
};

export { validate as a, round as b, mapEnterKey as c, parseMoney as d };
