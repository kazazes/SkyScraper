import VeeValidate, { Validator } from "vee-validate";
import Vue from "vue";
import {required } from "vee-validate/dist/rules.esm"

// Add the required rule
Validator.extend("required", {
  ...required,
  getMessage: () => "This field is required",
});

Validator.extend("password", {
  validate: passwordValidator,
  getMessage(field: string, params: any[], data: any): string {
    return "6 or more characters, must include a digit and symbol.";
  },
});

Validator.extend("tel-us", {
  validate: phoneValidation,
  getMessage(field: string, params: any[], data: any): string {
    return "Not a valid US number."
  }
})

function passwordValidator(value: string, args) {
  const password = value;
  if (value.length < 6)
    return false;
  const hasNumbers = /\d/.test(password);
  const hasNonAlphas = /\W/.test(password);
  return hasNonAlphas && hasNumbers;
};

function phoneValidation(value: string,  args) {
  return /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/.test(value);
}

// Register it globally
// main.js or any entry file.
Vue.use(VeeValidate, {mode: "lazy"});
