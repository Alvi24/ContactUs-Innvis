const form = document.querySelector("form");
const messageCheckBox = document.querySelector("input[type='checkbox']");
const radioButtonEmail = document.querySelector("#email");
const radioButtonsTelEmail = Array.from(
  document.querySelectorAll("input[name='Contact via']")
);
const radioButtonsEmailSpecificationLabel = Array.from(
  document.querySelectorAll(".emailSpecificationLabel")
);
const dropdown = document.querySelector("select");

window.addEventListener("load", function () {
  // refresh all inputs on refresh (Firefox)
  let textInputs = document.querySelectorAll(
    'select,input:not(:is([type="checkbox"],[type="radio"]))'
  );
  let buttons = document.querySelectorAll(
    'input:is([type="checkbox"],[type="radio"])'
  );
  textInputs.forEach((textInput) => (textInput.value = ""));
  buttons.forEach((button) => (button.checked = false));
});

dropdown.addEventListener("change", () => {
  dropdown.classList.remove("invalid");
});

radioButtonsTelEmail.forEach((clickedRadioButton) =>
  clickedRadioButton.addEventListener("click", () => {
    radioButtonsEmailSpecificationLabel.forEach(
      (radioButtonEmailSpecificationLabel) => {
        const radioButtonEmailSpecification =
          radioButtonEmailSpecificationLabel.querySelector(
            "input[type='radio']"
          );
        if (clickedRadioButton.id == "email") {
          radioButtonEmailSpecificationLabel.classList.add("show");
          radioButtonEmailSpecification.required = true;
        } else {
          radioButtonEmailSpecificationLabel.classList.remove("show");
          radioButtonEmailSpecification.required = false;
          radioButtonEmailSpecification.checked = false;
        }
      }
    );
  })
);

messageCheckBox.addEventListener("click", () => {
  const messageTextInput = document.querySelector("input[name='MessageText']");
  if (messageTextInput.classList.contains("show")) {
    messageTextInput.value = "";
    messageTextInput.classList = "hidden";
    messageTextInput.required = false;
  } else {
    messageTextInput.classList = "show";
    messageTextInput.required = true;
  }
});

function validateInput(input) {
  let isInputValid = false;

  switch (input.type) {
    case "text":
      isInputValid = input.value.trim().length >= 10;
      break;
    case "email":
      const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      isInputValid = EmailRegEx.test(input.value);
      break;
    case "tel":
      const TelRegEx = /^[0-9]{9,10}$/;
      isInputValid = TelRegEx.test(input.value);
      break;
    case "select-one":
      isInputValid = input.value !== "";
      break;
    default:
      return true;
  }

  if (isInputValid) input.classList.remove("invalid");
  else input.classList.add("invalid");
  return isInputValid;
}

function validateForm(form) {
  form.preventDefault();

  const inputs = Array.from(
    document.querySelectorAll(
      "select,input:not(.hidden, [type='checkbox'], [type='radio']:not(:checked))"
    )
  );
  let isFormValid = true;

  for (const input of inputs) {
    if (!validateInput(input)) isFormValid = false;
  }
  if (!isFormValid) return;

  const inputsText = inputs
    .filter((input) => input.value.trim() !== "")
    .map((filteredInput) => `${filteredInput.name}: ${filteredInput.value}`)
    .join("\n");

  alert(inputsText);
}

form.addEventListener("submit", (e) => validateForm(e));
