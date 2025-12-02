const form = document.querySelector(".contact");

function validateFirstName(firstname) {
  return firstname.trim() !== "";
}

function validateLastName(lastName) {
  return lastName.trim() !== "";
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.trim() !== "" && emailPattern.test(email);
}

function validateQueryType(queryType) {
  return queryType !== null && queryType !== undefined;
}

function validateMessage(message) {
  return message.trim() !== "";
}

function validateConsent(consent) {
  return consent === true;
}

function showError(input, errorElement) {
  errorElement.style.display = "block";
  input.style.borderColor = "hsl(0, 66%, 54%)";
}

function hideError(input, errorElement) {
  errorElement.style.display = "none";
  input.style.borderColor = "hsl(186, 15%, 59%)";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;

  // Fix queryType to handle null
  const queryTypeElement = document.querySelector(
    'input[name="query-type"]:checked'
  );
  const queryType = queryTypeElement ? queryTypeElement.value : null;

  const message = document.querySelector("textarea").value;
  const consent = document.getElementById("consent").checked;

  // Get input elements
  const firstNameInput = document.getElementById("firstname");
  const lastNameInput = document.getElementById("lastname");
  const emailInput = document.getElementById("email");
  const radioContainer = document.querySelector(".radio-type");
  const messageInput = document.querySelector("textarea");
  const consentInput = document.getElementById("consent");

  // Get error messages
  const errorMessages = document.querySelectorAll(".error");

  // Start with isValid = true
  let isValid = true;

  // DO ALL VALIDATIONS FIRST (before checking isValid)
  if (!validateFirstName(firstName)) {
    showError(firstNameInput, errorMessages[0]);
    isValid = false;
  } else {
    hideError(firstNameInput, errorMessages[0]);
  }

  if (!validateLastName(lastName)) {
    showError(lastNameInput, errorMessages[1]);
    isValid = false;
  } else {
    hideError(lastNameInput, errorMessages[1]);
  }

  if (!validateEmail(email)) {
    showError(emailInput, errorMessages[2]);
    isValid = false;
  } else {
    hideError(emailInput, errorMessages[2]);
  }

  if (!validateQueryType(queryType)) {
    showError(radioContainer, errorMessages[3]);
    isValid = false;
  } else {
    hideError(radioContainer, errorMessages[3]);
  }

  if (!validateMessage(message)) {
    showError(messageInput, errorMessages[4]);
    isValid = false;
  } else {
    hideError(messageInput, errorMessages[4]);
  }

  if (!validateConsent(consent)) {
    showError(consentInput, errorMessages[5]);
    isValid = false;
  } else {
    hideError(consentInput, errorMessages[5]);
  }

  console.log("Validation complete!");

  // NOW check if form is valid (AFTER all validations)
  if (isValid) {
    console.log("Form is valid! Ready to submit.");
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      queryType: queryType,
      message: message,
      consent: consent,
    });

    console.log("=== FINAL CHECK BEFORE SUBMIT ===");
    console.log("First Name:", firstName, "- Valid?", validateFirstName(firstName));
    console.log("Last Name:", lastName, "- Valid?", validateLastName(lastName));
    console.log("Email:", email, "- Valid?", validateEmail(email));
    console.log("Query Type:", queryType, "- Valid?", validateQueryType(queryType));
    console.log("Message:", message, "- Valid?", validateMessage(message));
    console.log("Consent:", consent, "- Valid?", validateConsent(consent));
    console.log("=================================");

    // Create success toast
    const successToast = document.createElement("div");

    // Add a class for styling
    successToast.classList.add("success-toast");

    // Add the content (icon + text)
    successToast.innerHTML = `
        <div style="display: flex; align-items: start; gap: 10px;">
            <span style="color: white; font-size: 20px;">✓</span>
            <div>
                <h3 style="margin: 0; color: white; font-size: 16px; font-weight: 700;">Message Sent!</h3>
                <p style="margin: 5px 0 0 0; color: white; font-size: 14px;">Thanks for completing the form. We'll be in touch soon!</p>
            </div>
        </div>
    `;

    // Add it to the page (at the top of body)
    document.body.insertBefore(successToast, document.body.firstChild);

    // Remove it after 5 seconds
    setTimeout(function () {
      successToast.remove();
    }, 5000);

    // Clear the form
    form.reset();
  } else {
    console.log("Form has errors. Please fix them.");
  }
});