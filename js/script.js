const form = document.querySelector("form");
const checkboxMessage = document.querySelector("input[name='checkboxMessage']");
const checkboxTerms = document.querySelector("input[name='checkboxTerms']");
const radioButtonsContactVia = Array.from(
  document.querySelectorAll("input[name='Contact via']")
);
const dropdown = document.querySelector("select");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modalText");
const modalCloseButton = document.querySelector(".closeModalButton");
const modalContinueButton = document.querySelector(".continueModalButton");

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
  checkboxMessage.checked = false;
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

checkboxMessage.addEventListener("click", () => {
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
      "select,input:not(.hidden,.hidden *,.notRequired,[type='checkbox'])"
    )
  );
  let isFormValid = true;

  for (const input of inputs) {
    if (!validateInput(input)) isFormValid = false;
  }

  if (!checkboxTerms.checked) {
    isFormValid = false;
    checkboxTerms.parentElement.classList.add("invalid");
  }

  if (!isFormValid) return;

  const inputsText = inputs
    .filter((input) => input.value !== "on")
    .map((filteredInput) => `${filteredInput.name}: ${filteredInput.value}`)
    .join("\n");

  alert(inputsText);
}

form.addEventListener("submit", (e) => validateForm(e));

checkboxTerms.addEventListener("click", (e) => {
  if (!modalContinueButton.disabled) modalContinueButton.disabled = true;

  if (checkboxTerms.checked) {
    e.preventDefault();
    modal.showModal();
  } else checkboxTerms.checked = false;
});

modalCloseButton.addEventListener("click", () => {
  modalText.scrollTop = 0;
  modal.close();
});
modalContinueButton.addEventListener("click", () => {
  checkboxTerms.checked = true;
  checkboxTerms.parentElement.classList.remove("invalid");
  modalText.scrollTop = 0;
  modal.close();
});

modalText.addEventListener("scroll", (e) => {
  const { scrollHeight, scrollTop, clientHeight } = e.target;

  if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1)
    modalContinueButton.disabled = false;
});
