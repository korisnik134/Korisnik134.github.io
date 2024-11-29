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
          // Obrada procenta
          expression = expression.replace(/(\d+)%/g, "($1 / 100)"); // Zamenjujemo % sa / 100
          
          // Evaluacija izraza
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

    // Provera naprednih funkcija
    if (['√', 'sin', 'cos', 'tan', 'log'].includes(value)) {
      if (resultShown) {
        expression = ""; // Resetujemo izraz ako je prethodno prikazan rezultat
        resultShown = false;
      }

      switch (value) {
        case '√':
          expression += 'Math.sqrt(';
          break;
        case 'sin':
          expression += 'Math.sin(';
          break;
        case 'cos':
          expression += 'Math.cos(';
          break;
        case 'tan':
          expression += 'Math.tan(';
          break;
        case 'log':
          expression += 'Math.log(';
          break;
      }
      display.value = expression; // Ažuriraj prikaz sa novim izrazom
    }
  });
});
