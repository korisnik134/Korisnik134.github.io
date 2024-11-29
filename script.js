let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));
let advancedFunctions = document.getElementById('advanced-functions');
let advancedFunctionsBtn = document.getElementById('advanced-functions-btn');

let expression = ""; // Čuva trenutni izraz
let resultShown = false; // Prati da li je rezultat prikazan

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.textContent;
    console.log(`Pritisnuto dugme: ${value}`);  // logujemo svaki pritisak dugmeta

    // Provera da li je kliknuto na dugme za promenu režima
    if (e.target === advancedFunctionsBtn) {
      // Toggle između prikaza "Advanced" i "Basic" funkcija
      advancedFunctions.classList.toggle('hidden');
      advancedFunctionsBtn.textContent = advancedFunctions.classList.contains('hidden') ? 'Advanced' : 'Basic';
      console.log('Napredne funkcije promenjene');
      return; // Izlazimo iz funkcije da sprečimo prikaz na ekranu
    }

    // Clear display
    if (value === 'C') {
      expression = "";
      display.value = "";
      resultShown = false;
      console.log('Čišćenje ekrana');
    }
    // Delete last character
    else if (value === '←') {
      if (!resultShown) {
        expression = expression.slice(0, -1);
        display.value = expression;
        console.log(`Obrisan poslednji karakter: ${expression}`);
      }
    }
    // Equals operation
    else if (value === '=') {
      if (!resultShown) {
        try {
          console.log(`Pre obračuna: ${expression}`);
          // Obrada procenta: zamenjujemo "%" sa "* 0.01" za tačno računanje
          let evalExpression = expression.replace(/(\d+)%/g, "($1 * 0.01)");
          console.log(`Obrađen procenat: ${evalExpression}`);

          // Obrada naprednih funkcija: √, sin, cos, tan, log
          evalExpression = evalExpression.replace(/√/g, "Math.sqrt");
          evalExpression = evalExpression.replace(/sin/g, "Math.sin");
          evalExpression = evalExpression.replace(/cos/g, "Math.cos");
          evalExpression = evalExpression.replace(/tan/g, "Math.tan");
          evalExpression = evalExpression.replace(/log/g, "Math.log");

          console.log(`Evaluacija izraza: ${evalExpression}`);

          // Evaluacija izraza sa pravim prioritetima
          let result = eval(evalExpression);
          console.log(`Rezultat evaluacije: ${result}`);

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
      console.log(`Izraz nakon unosa: ${expression}`);
    }
  });
});
