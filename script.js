let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
let advancedFunctions = document.getElementById('advanced-functions');
let advancedFunctionsBtn = document.getElementById('advanced-functions-btn');

let expression = ""; // Čuva trenutni izraz
let resultShown = false; // Prati da li je rezultat prikazan

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.textContent;
    console.log(`Pritisnuto dugme: ${value}`);

    // Provera za napredne funkcije
    if (e.target === advancedFunctionsBtn) {
      advancedFunctions.classList.toggle('hidden');
      advancedFunctionsBtn.textContent = advancedFunctions.classList.contains('hidden') ? 'Advanced' : 'Basic';
      return;
    }

    // Clear display
    if (value === 'C') {
      console.log("Čišćenje ekrana");
      expression = "";
      display.value = "";
      resultShown = false;
    }
    // Delete last character
    else if (value === '←') {
      if (!resultShown) {
        expression = expression.slice(0, -1);
        display.value = expression;
        console.log(`Izraz nakon brisanja: ${expression}`);
      }
    }
    // Equals operation
    else if (value === '=') {
      if (!resultShown) {
        try {
          console.log(`Pre obračuna: ${expression}`);

          // Obrada procenta
          let evalExpression = expression.replace(/(\d+)%/g, "($1 / 100)");

          // Modifikacija za procenat unutar izraza
          evalExpression = evalExpression.replace(/(\d+)([-+*/])(\d+)\%/g, "($1$2($1 * ($3 / 100)))");

          // Dodavanje podrške za početne operatore
          if (/^[+\-*/]/.test(evalExpression)) {
            evalExpression = "0" + evalExpression;
          }

          // Obrada naprednih funkcija
          evalExpression = evalExpression.replace(/√(\d+)/g, "Math.sqrt($1)");
          evalExpression = evalExpression.replace(/sin(\d+)/g, "Math.sin($1)");
          evalExpression = evalExpression.replace(/cos(\d+)/g, "Math.cos($1)");
          evalExpression = evalExpression.replace(/tan(\d+)/g, "Math.tan($1)");
          evalExpression = evalExpression.replace(/log(\d+)/g, "Math.log($1)");

          console.log(`Evaluacija izraza: ${evalExpression}`);

          // Evaluacija izraza
          let result = eval(evalExpression);
          console.log(`Rezultat evaluacije: ${result}`);

          // Prikaz rezultata
          display.value = result;
          expression = result.toString();
          resultShown = true;
        } catch (error) {
          console.error(error);  // Logovanje greške
          display.value = "Error";
          expression = "";
        }
      }
    }
    // Za operatore i brojeve
    else {
      // Ako je rezultat prikazan, resetujemo izraz na rezultat
      if (resultShown) {
        expression = display.value; // koristi prethodni rezultat kao početak novog izraza
        resultShown = false;
      }

      // Posebna obrada za procenat
      if (value === '%') {
        if (expression && /^[\d\)]$/.test(expression.slice(-1))) {
          expression += '*0.01';
        } else if (expression && /[-+*/]$/.test(expression.slice(-1))) {
          expression += '0.01';
        } else {
          // Ako je samo procenat unet, dodaj procenat na poslednji broj
          expression += '%';
        }
      } else {
        expression += value;
      }

      display.value = expression;
      console.log(`Izraz nakon unosa: ${expression}`);
    }
  });
});
