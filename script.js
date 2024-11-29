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
          // Obrada procenta: zamenjujemo "%" sa "*0.01"
          let evalExpression = expression.replace(/(\d+)%/g, "($1 * 0.01)");

          // Obrada naprednih funkcija: √, sin, cos, tan, log
          evalExpression = evalExpression.replace(/√/g, "Math.sqrt");
          evalExpression = evalExpression.replace(/sin/g, "Math.sin");
          evalExpression = evalExpression.replace(/cos/g, "Math.cos");
          evalExpression = evalExpression.replace(/tan/g, "Math.tan");
          evalExpression = evalExpression.replace(/log/g, "Math.log");

          // Evaluacija izraza sa pravim prioritetima
          let result = eval(evalExpression);

          // Prikazivanje samo rezultata, bez Math funkcija u prikazu
          display.value = result;

          expression = result.toString();
          resultShown = true; // Postavljamo flag da je rezultat prikazan
        } catch (error) {
          console.error(error);  // Ispis greške u konzolu za debugging
          display.value = "Error";
          expression = "";
        }
      }
    }
    // Za operatore i brojeve
    else {
      // Ako je rezultat prikazan, resetujemo izraz
      if (resultShown) {
        expression = "";
        resultShown = false;
      }

      // Ako pritisneš broj ili operaciju, dodajemo to u trenutni izraz
      expression += value;
      display.value = expression;
    }
  });
});
