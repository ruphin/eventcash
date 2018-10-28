import { GluonElement, html } from '../../node_modules/@gluon/gluon/gluon.js';
import { changeRoute } from '../../node_modules/@gluon/router/gluon-router.js';

class BuyPage extends GluonElement {
  constructor() {
    super();
    this.eventName = 'Placeholder';
    this.ticketPrice = 0.00015;
    this.price = this.ticketPrice;
  }
  get template() {
    return html`
      <style>
        :host {
          display: block;
          overflow: auto;
          background: #f3f3f3;
          padding: 40px;
        }
        /* Buttons */
        .button {
          display: inline-block;
          text-decoration: none;
          border: 0;
          font-size: 1em;
          line-height: 25px;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
          position: relative;
          padding: 4px 12px;
          margin: 1em;
          overflow: hidden;
          text-transform: uppercase;
          border-radius: 3px;
          outline-color: #ccc;
          background: #4285f4;
          color: #fff;
        }

        .button:hover {
          background-color: #3367d6 !important;
          cursor: pointer;
        }

        /* FORM STUFF */
        .form-radio,
        .form-group {
          position: relative;
          margin-top: 2.25rem;
          margin-bottom: 2.25rem;
        }

        .form-inline > .form-group,
        .form-inline > .btn {
          display: inline-block;
          margin-bottom: 0;
        }

        .form-help {
          margin-top: 0.125rem;
          margin-left: 0.125rem;
          color: #b3b3b3;
          font-size: 0.8rem;
        }
        .checkbox .form-help, .form-radio .form-help, .form-group .form-help {
          position: absolute;
          width: 100%;
        }
        .checkbox .form-help {
          position: relative;
          margin-bottom: 1rem;
        }
        .form-radio .form-help {
          padding-top: 0.25rem;
          margin-top: -1rem;
        }

        .form-group input {
          height: 1.9rem;
        }
        .form-group textarea {
          resize: none;
        }
        .form-group select {
          width: 100%;
          font-size: 1rem;
          height: 1.6rem;
          padding: 0.125rem 0.125rem 0.0625rem;
          background: none;
          border: none;
          line-height: 1.6;
          box-shadow: none;
        }
        .form-group .control-label {
          position: absolute;
          top: 0.25rem;
          pointer-events: none;
          padding-left: 0.125rem;
          z-index: 1;
          color: #b3b3b3;
          font-size: 1rem;
          font-weight: normal;
          -webkit-transition: all 0.28s ease;
          transition: all 0.28s ease;
        }
        .form-group .bar {
          position: relative;
          border-bottom: 0.0625rem solid #999;
          display: block;
        }
        .form-group .bar::before {
          content: '';
          height: 0.125rem;
          width: 0;
          left: 50%;
          bottom: -0.0625rem;
          position: absolute;
          background: #337ab7;
          -webkit-transition: left 0.28s ease, width 0.28s ease;
          transition: left 0.28s ease, width 0.28s ease;
          z-index: 2;
        }
        .form-group input,
        .form-group textarea {
          display: block;
          background: none;
          padding: 0.125rem 0.125rem 0.0625rem;
          font-size: 1rem;
          border-width: 0;
          border-color: transparent;
          line-height: 1.9;
          width: 100%;
          color: transparent;
          -webkit-transition: all 0.28s ease;
          transition: all 0.28s ease;
          box-shadow: none;
        }
        .form-group input[type="file"] {
          line-height: 1;
        }
        .form-group input[type="file"] ~ .bar {
          display: none;
        }
        .form-group select,
        .form-group input:focus,
        .form-group input:valid,
        .form-group input.form-file,
        .form-group input.has-value,
        .form-group textarea:focus,
        .form-group textarea:valid,
        .form-group textarea.form-file,
        .form-group textarea.has-value {
          color: #333;
        }
        .form-group select ~ .control-label,
        .form-group input:focus ~ .control-label,
        .form-group input:valid ~ .control-label,
        .form-group input.form-file ~ .control-label,
        .form-group input.has-value ~ .control-label,
        .form-group textarea:focus ~ .control-label,
        .form-group textarea:valid ~ .control-label,
        .form-group textarea.form-file ~ .control-label,
        .form-group textarea.has-value ~ .control-label {
          font-size: 0.8rem;
          color: gray;
          top: -1rem;
          left: 0;
        }
        .form-group select:focus,
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
        }
        .form-group select:focus ~ .control-label,
        .form-group input:focus ~ .control-label,
        .form-group textarea:focus ~ .control-label {
          color: #337ab7;
        }
        .form-group select:focus ~ .bar::before,
        .form-group input:focus ~ .bar::before,
        .form-group textarea:focus ~ .bar::before {
          width: 100%;
          left: 0;
        }

        .checkbox label,
        .form-radio label {
          position: relative;
          cursor: pointer;
          padding-left: 2rem;
          text-align: left;
          color: #333;
          display: block;
        }
        .checkbox input,
        .form-radio input {
          width: auto;
          opacity: 0.00000001;
          position: absolute;
          left: 0;
        }

        .radio {
          margin-bottom: 1rem;
        }
        .radio .helper {
          position: absolute;
          top: -0.25rem;
          left: -0.25rem;
          cursor: pointer;
          display: block;
          font-size: 1rem;
          -webkit-user-select: none;
            -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
          color: #999;
        }
        .radio .helper::before, .radio .helper::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          margin: 0.25rem;
          width: 1rem;
          height: 1rem;
          -webkit-transition: -webkit-transform 0.28s ease;
          transition: -webkit-transform 0.28s ease;
          transition: transform 0.28s ease;
          transition: transform 0.28s ease, -webkit-transform 0.28s ease;
          border-radius: 50%;
          border: 0.125rem solid currentColor;
        }
        .radio .helper::after {
          -webkit-transform: scale(0);
                  transform: scale(0);
          background-color: #337ab7;
          border-color: #337ab7;
        }
        .radio label:hover .helper {
          color: #337ab7;
        }
        .radio input:checked ~ .helper::after {
          -webkit-transform: scale(0.5);
                  transform: scale(0.5);
        }
        .radio input:checked ~ .helper::before {
          color: #337ab7;
        }

        .checkbox {
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .checkbox .helper {
          color: #999;
          position: absolute;
          top: 0;
          left: 0;
          width: 1rem;
          height: 1rem;
          z-index: 0;
          border: 0.125rem solid currentColor;
          border-radius: 0.0625rem;
          -webkit-transition: border-color 0.28s ease;
          transition: border-color 0.28s ease;
        }
        .checkbox .helper::before, .checkbox .helper::after {
          position: absolute;
          height: 0;
          width: 0.2rem;
          background-color: #337ab7;
          display: block;
          -webkit-transform-origin: left top;
                  transform-origin: left top;
          border-radius: 0.25rem;
          content: '';
          -webkit-transition: opacity 0.28s ease, height 0s linear 0.28s;
          transition: opacity 0.28s ease, height 0s linear 0.28s;
          opacity: 0;
        }
        .checkbox .helper::before {
          top: 0.65rem;
          left: 0.38rem;
          -webkit-transform: rotate(-135deg);
                  transform: rotate(-135deg);
          box-shadow: 0 0 0 0.0625rem #fff;
        }
        .checkbox .helper::after {
          top: 0.3rem;
          left: 0;
          -webkit-transform: rotate(-45deg);
                  transform: rotate(-45deg);
        }
        .checkbox label:hover .helper {
          color: #337ab7;
        }
        .checkbox input:checked ~ .helper {
          color: #337ab7;
        }
        .checkbox input:checked ~ .helper::after, .checkbox input:checked ~ .helper::before {
          opacity: 1;
          -webkit-transition: height 0.28s ease;
          transition: height 0.28s ease;
        }
        .checkbox input:checked ~ .helper::after {
          height: 0.5rem;
        }
        .checkbox input:checked ~ .helper::before {
          height: 1.2rem;
          -webkit-transition-delay: 0.28s;
                  transition-delay: 0.28s;
        }

        .radio + .radio,
        .checkbox + .checkbox {
          margin-top: 1rem;
        }

        /* Things */

        h2 {
          display: inline-block;
        }

        .price-select {
          max-width: 500px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
        }
        .price {
          margin-left: 6px;
        }
        .x {
          margin-right: 16px;
        }
        .form-group {
          display: inline-block;
          width: 200px;
        }
      </style>

      <h2>Event<span class="count"> — ${this.eventName}</span></h2>

      
      <div class="price-select">
        <div class="form-group">
          <select id="amount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="1">5</option>
          </select>
          <label for="amount" class="control-label">Tickets</label><i class="bar"></i>
        </div>
        <p class="price"><span class="x">x</span>${this.ticketPrice}</p>
      </div>

      <p class="price">
        Total price: ${this.price}
      </p>
      <button id="buyButton" class="button">Buy</button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.amount.addEventListener('input', () => {
      this.price = Number(this.$.amount.value) * this.ticketPrice;
      this.render();
    });
    this.$.buyButton.addEventListener('click', () => {
      const data = { event_id: 1, batch_id: 1, amount: Number(this.$.amount.value) };
      fetch('http://192.168.1.108:3001/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        // Promise.resolve({ address: 'someaddressstring', price: 0.0006 })
        .then(response => {
          changeRoute(`buy/payment?address=${response.address}&amount=${response.price}&salt=${response.salt}`);
        });
    });
  }

  visit() {
    // Pull ticketprice and event name
    this.render();
  }
}

customElements.define(BuyPage.is, BuyPage);
