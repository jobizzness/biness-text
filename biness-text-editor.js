/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

window.customElements.define('biness-text-editor', class extends PolymerElement {
  static get template() {
    return html`
        <style>
            ::slotted([contenteditable]) {
                outline: none;
            }
        </style>
        <slot></slot>
    `;
  }

  static get properties() {
    return {
      editable: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      value: {
        type: String,
        reflectToAttribute: true,
        value: null,
        notify: true,
        observer: '_valueChanged'
      },
      placeholder: {
        type: String,
        value: 'Enter your text...',
        reflectToAttribute: true
      },
    }


  }

  static get observers() {
    return [
      '_editableChanged(editable)'
    ]
  }

  connectedCallback() {
    super.connectedCallback();

  }

  _valueChanged(val, old) {
    this.innerHTML = (!this.value && this.editable) ? this.placeholder : this.value;
  }

  ready() {
    super.ready();
    this.timeout = null;
    this.addEventListener('keydown', (e) => this._keydown(e));
  }

  _editableChanged(val) {
    (val) ? this.setAttribute('contenteditable', '') : this.removeAttribute('contenteditable');
  }

  _keydown(e) {

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(this.timeout);

    // Make a new timeout set to go off in 800ms
    this.timeout = setTimeout(() => {
      this.value = this.innerText;
      this.htmlValue = this.innerHTML;

    }, 500);
  }

  constructor() {
    super();
  }

});
