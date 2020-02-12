import Vue from 'vue';

// Import Polyfills
import './polyfills';

// Import Web Components
import './password-checker';

// Import stylesheets
import './style.css';

/*Vue.config.ignoredElements = [
  'password-checker',
];*/

var app = new Vue({
  el: '#app',
  data: {
    password: null,
    success: false,
    lowerCasePattern: /^[a-z0-9_\-]+$/,
  },
  methods: {
    showCongratulations(e) {
      this.success = true;
      setTimeout(() => this.success = false, 5000);
    },
  },
});