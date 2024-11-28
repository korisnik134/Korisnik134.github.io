let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
let advancedFunctions = document.getElementById('advanced-functions');
let advancedFunctionsBtn = document.getElementById('advanced-functions-btn');

let expression = ""; // Čuva trenutni izraz
let resultShown = false; // Prati da li je rezultat prikazan

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.textContent;

    // Provera da li je kliknuto na dugme za promenu režima
    if (e.target === advancedFunctionsBtn) {
      // Toggle između prikaza "Advanced" i "Basic" funkcija
      advancedFunctions.classList.toggle('hidden');
      advancedFunctionsBtn.textContent = advancedFunctions.classList.contains('hidden') ? 'Advanced' : 'Basic';
      return; // Izlazimo iz funkcije da sprečimo prikaz na ekranu
    }

    // Clear display
    if (value === 'C') {
      expression = "";
      display.value = "";
      resultShown = false;
    }
    // Delete last character
    else if (value === '←') {
      if (!resultShown) {
        expression = expression.slice(0, -1);
        display.value = expression;
      }
    }
    // Equals operation
    else if (value === '=') {
      if (!resultShown) {
        try {
          let result = eval(expression);
          display.value = `${expression} = ${result}`;
          expression = result.toString();
          resultShown = true; // Postavljamo flag da je rezultat prikazan
        } catch {
          display.value = "Error";
          expression = "";
        }
      }
    }
    // For operators and numbers
    else {
      // Ako je rezultat prikazan, kreni novi izraz
      if (resultShown) {
        expression = "";
        resultShown = false;
      }
      expression += value;
      display.value = expression;
    }
  });
});