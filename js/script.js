const form = document.querySelector("form");
const messageCheckBox = document.querySelector("input[type='checkbox']");
const radioButtonsTelEmail = Array.from(
  document.querySelectorAll("input[name='Contact via']")
);
const dropdown = document.querySelector("select");

window.addEventListener("load", function () {
  // refresh all inputs on reload (Firefox)
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

function handleRadioButtonTelEmailClick(clickedRadioButtonTelEmail) {
  const radioButtonsEmailSpecification = Array.from(
    document.querySelectorAll("input[name='EmailSpecification']")
  );

  radioButtonsEmailSpecification.forEach((radioButtonEmailSpecification) => {
    if (clickedRadioButtonTelEmail.id == "email") {
      radioButtonEmailSpecification.parentElement.classList.remove("hidden");
      radioButtonEmailSpecification.required = true;
    } else {
      radioButtonEmailSpecification.parentElement.classList.add("hidden");
      radioButtonEmailSpecification.required = false;
      radioButtonEmailSpecification.checked = false;
    }
  });
}

radioButtonsTelEmail.forEach((radioButtonTelEmail) =>
  radioButtonTelEmail.addEventListener("click", () =>
    handleRadioButtonTelEmailClick(radioButtonTelEmail)
  )
);

messageCheckBox.addEventListener("click", () => {
  const messageTextInput = document.querySelector("input[name='MessageText']");
  if (messageTextInput.classList.contains("hidden")) {
    messageTextInput.classList.remove("hidden");
    messageTextInput.required = true;
  } else {
    messageTextInput.value = "";
    messageTextInput.classList.add("hidden");
    messageTextInput.classList.remove("invalid");
    messageTextInput.required = false;
  }
});

function validateInput(input) {
  let isInputValid = false;

  switch (input.type) {
    case "text":
      isInputValid = input.value.trim().length >= 50;
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
