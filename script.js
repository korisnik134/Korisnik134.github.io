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

    // Provera da li je kliknuto na dugme za promenu režima
    if (e.target === advancedFunctionsBtn) {
      // Toggle između prikaza "Advanced" i "Basic" funkcija
      advancedFunctions.classList.toggle('hidden');
      advancedFunctionsBtn.textContent = advancedFunctions.classList.contains('hidden') ? 'Advanced' : 'Basic';
      return; // Izlazimo iz funkcije da sprečimo prikaz na ekranu
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

          // Modifikovano za procenat kao deo izraza
          evalExpression = evalExpression.replace(/(\d+)([-+*/])(\d+)\%/g, "($1$2($1 * ($3 / 100)))");

          console.log(`Obrađen procenat: ${evalExpression}`);

          // Obrada naprednih funkcija sa zagradama
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
      // Ako je rezultat prikazan, resetujemo izraz
      if (resultShown) {
        expression = "";
        resultShown = false;
      }

      // Ako pritisneš broj ili operaciju, dodajemo to u trenutni izraz
      expression += value;
      display.value = expression;
      console.log(`Izraz nakon unosa: ${expression}`);
    }
  });
});
