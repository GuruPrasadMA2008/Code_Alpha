// Get the display input box
var display = document.getElementById("display");

// Add a number or operator to the display
function appendToDisplay(value) {
  display.value += value;
}

// Clear the entire display
function clearDisplay() {
  display.value = "";
}

// Delete the last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
  // If display is empty, do nothing
  if (display.value === "") return;

  try {
    // eval() reads the math expression and gives the answer
    var result = eval(display.value);
    display.value = result;
  } catch (error) {
    // If something goes wrong (like invalid input), show Error
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  var key = event.key;

  if (key >= "0" && key <= "9") appendToDisplay(key);   // number keys
  else if (key === "+") appendToDisplay("+");
  else if (key === "-") appendToDisplay("-");
  else if (key === "*") appendToDisplay("*");
  else if (key === "/") { event.preventDefault(); appendToDisplay("/"); }
  else if (key === "%") appendToDisplay("%");
  else if (key === ".") appendToDisplay(".");
  else if (key === "Enter") calculate();                 // Enter = equals
  else if (key === "Backspace") deleteLast();            // Backspace = delete
  else if (key === "Escape") clearDisplay();             // Escape = clear
});