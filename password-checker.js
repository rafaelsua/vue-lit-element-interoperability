import { LitElement, html, css } from "lit-element";

const PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
const LOWER_CASE_PATTERN = /^[a-z0-9_\-]+$/;

// slot empty
// slot strong
// slot weak

class PasswordChecker extends LitElement {
  static get properties() {
    return {
      password: {
        type: String,
        reflect: true
      },
      pattern: String
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px dotted black;
        margin: 2px;
        padding: 5px 5px;
      }

      slot[name="empty"] {
        text-decoration: underline;
      }
      slot[name="strong"] {
        color: green;
      }
      slot[name="weak"] {
        color: red;
      }
    `;
  }

  constructor() {
    super();

    this.pattern = PATTERN;
    this.password = null;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'password' && this.isValid(this.password)) {
        this.dispatchEvent(new Event('password-valid'));
      }
    });
  }

  isValid(passwd) {
    return this.pattern.test(passwd);
  }

  get emptyPassword() {
    return this.password == null || this.password === "";
  }

  get emptyPasswordTemplate() {
    return html`
      <slot name="empty">
        No password 🕵️️
      </slot>
    `;
  }

  get statusTemplate() {
    return html`
      <div>
        Strength: <progress value=${this.password.length - 3} max="5"</progress>
      </div>
    `;
  }

  get validationTemplate() {
    const valid = this.isValid(this.password);
    const validationModel = {
      true: {
        slot: "strong",
        message: "valid 👍",
        status: this.statusTemplate
      },
      false: {
        slot: "weak",
        message: "INVALID 👎",
        status: null
      }
    };
    const { slot, message, status } = validationModel[valid];

    return html`
      <slot name=${slot}>
        <span>Your password is <strong>${message}</strong></span>
      </slot>
      ${status}
    `;
  }

  render() {
    return this.emptyPassword
      ? this.emptyPasswordTemplate
      : this.validationTemplate;
  }
}

customElements.define("password-checker", PasswordChecker);
