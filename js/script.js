const form = document.querySelector("form");
const messageCheckBox = document.querySelector("input[name='checkboxMessage']");
const radioButtonsContactVia = Array.from(
  document.querySelectorAll("input[name='Contact via']")
);
const dropdown = document.querySelector("select");

window.addEventListener("load", function () {
  // refresh all inputs on reload (Firefox) and add event listeners
  let textInputs = document.querySelectorAll(
    'select,input:not(:is([type="checkbox"],[type="radio"]),.notRequired)'
  );
  let buttons = document.querySelectorAll(
    'input:is([type="checkbox"],[type="radio"]):not(.notRequired)'
  );
  textInputs.forEach((textInput) => {
    textInput.value = "";
    textInput.addEventListener("input", (e) => validateInput(e.target));
  });
  buttons.forEach((button) => {
    button.checked = false;
    button.addEventListener("click", (e) => validateInput(e.target));
  });
});

dropdown.addEventListener("change", () => {
  dropdown.classList.remove("invalid");
});

function handleRadioButtonTelEmailClick(clickedRadioButtonTelEmail) {
  const radioButtonsEmailSpecification = Array.from(
    document.querySelectorAll("input[name='Email specification']")
  );

  radioButtonsEmailSpecification.forEach((radioButtonEmailSpecification) => {
    if (clickedRadioButtonTelEmail.id == "email") {
      radioButtonEmailSpecification.parentElement.classList.remove("hidden");
    } else {
      radioButtonEmailSpecification.parentElement.classList = "hidden";
      radioButtonEmailSpecification.checked = false;
    }
  });
}

radioButtonsContactVia.forEach((radioButtonContactVia) => {
  radioButtonContactVia.addEventListener("click", () =>
    handleRadioButtonTelEmailClick(radioButtonContactVia)
  );
});

messageCheckBox.addEventListener("click", () => {
  const messageTextInput = document.querySelector("input[name='MessageText']");
  if (messageTextInput.classList.contains("hidden")) {
    messageTextInput.classList.remove("hidden");
  } else {
    messageTextInput.value = "";
    messageTextInput.classList = "hidden";
  }
});

function validateButton(buttonName) {
  const buttons = Array.from(
    document.querySelectorAll(`input[name='${buttonName}']`)
  );
  let isAnyButtonClicked = false;

  buttons.forEach((button) => {
    button.parentElement.classList.remove("invalid");
    if (button.checked) {
      isAnyButtonClicked = true;
      button.classList.remove("notRequired");
    } else {
      button.classList.add("notRequired");
    }
  });
  if (!isAnyButtonClicked) {
    //none of the buttons are clicked
    buttons.forEach((button) => {
      button.parentElement.classList.add("invalid");
      button.classList.remove("notRequired");
    });
  }

  return isAnyButtonClicked;
}

function validateInput(input) {
  let isInputValid = false;

  switch (input.type) {
    case "text":
      isInputValid =
        input.value.trim().length > 0 && input.value.trim().length <= 50;
      break;
    case "email":
      const EmailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
      isInputValid = EmailRegEx.test(input.value);
      break;
    case "tel":
      const TelRegEx = /^\d{9,10}$/;
      input.value = input.value.replace(/\D/g, "");
      isInputValid = TelRegEx.test(input.value);
      break;
    case "select-one":
      isInputValid = input.value !== "";
      break;
    case "radio":
    case "checkbox":
      isInputValid = validateButton(input.name);
      break;
    default:
      return true;
  }

  if (isInputValid) input.classList.remove("invalid");
  else input.classList.add("invalid");
  return isInputValid;
}

function validateForm(formEvent) {
  formEvent.preventDefault();

  const inputs = Array.from(
    document.querySelectorAll(
      "select,input:not(.hidden,.hidden *,.notRequired)"
    )
  );
  let isFormValid = true;

  for (const input of inputs) {
    if (!validateInput(input)) isFormValid = false;
  }

  if (!isFormValid) return;

  const inputsText = inputs
    .filter((input) => input.value !== "on")
    .map((filteredInput) => `${filteredInput.name}: ${filteredInput.value}`)
    .join("\n");

  alert(inputsText);
}

form.addEventListener("submit", (e) => validateForm(e));
