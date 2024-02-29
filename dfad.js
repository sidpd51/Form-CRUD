function validateForm() {
    var rowsToValidate = document.querySelectorAll('#educationTableBody tr');
    var isValid = true;

    rowsToValidate.forEach(function (row) {
      var elementsToValidate = row.querySelectorAll('input');
      elementsToValidate.forEach(function (element) {
        var className = element.classList[1]; // Assumes the second class is the unique identifier

        switch (className) {
          case 'degree':
            isValid = validateDegree(element);
            break;
          case 'college':
            isValid = validateCollege(element);
            break;
          case 'startYear':
            isValid = validateStartYear(element);
            break;
          case 'passoutYear':
            isValid = validatePassoutYear(element);
            break;
          case 'percentage':
            isValid = validatePercentage(element);
            break;
          case 'backlog':
            isValid = validateBacklog(element);
            break;
          default:
            isValid = true; // Add default validation or skip for unknown classes
        }

        if (!isValid) {
          showErrorMessage(element, 'Validation failed.');
        } else {
          hideErrorMessage(element);
        }
      });
    });

    if (isValid) {
      alert('Form is valid! You can submit it.');
      // Add your form submission logic here
    } else {
      alert('Form has errors. Please fix them.');
    }
  }

  function validateDegree(element) {
    // Your specific validation logic for degree
    // Example: Check if the degree is not empty
    return element.value.trim() !== '';
  }

  function validateCollege(element) {
    // Your specific validation logic for college
    // Example: Check if the college is not empty
    return element.value.trim() !== '';
  }

  function validateStartYear(element) {
    // Your specific validation logic for startYear
    // Example: Check if the startYear is a valid format
    return element.value.match(/^\d{4}-\d{2}$/) !== null;
  }

  function validatePassoutYear(element) {
    // Your specific validation logic for passoutYear
    // Example: Check if the passoutYear is a valid format
    return element.value.match(/^\d{4}-\d{2}$/) !== null;
  }

  function validatePercentage(element) {
    // Your specific validation logic for percentage
    // Example: Check if the percentage is between 0 and 100
    var percentage = parseFloat(element.value);
    return !isNaN(percentage) && percentage >= 0 && percentage <= 100;
  }

  function validateBacklog(element) {
    // Your specific validation logic for backlog
    // Example: Check if the backlog is a non-negative number
    var backlog = parseInt(element.value, 10);
    return !isNaN(backlog) && backlog >= 0;
  }

  function showErrorMessage(element, message) {
    var errorMessage = element.nextElementSibling;
    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.className = 'msg' + element.classList[1] + ' error fs-6'; // Assumes the second class is the unique identifier
      errorMessage.textContent = message;
      element.parentNode.appendChild(errorMessage);
    }
  }

  function hideErrorMessage(element) {
    var errorMessage = element.nextElementSibling;
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function removeEducationRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }