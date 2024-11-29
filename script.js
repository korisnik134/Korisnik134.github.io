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

          // Obrada procenata: Zamenjujemo procenat sa brojem koji predstavlja
          let evalExpression = expression.replace(/(\d+)(%)/g, (match, num) => {
            let percentageValue = (parseFloat(num) / 100) * parseFloat(num); // Izračunavanje procenta
            console.log(`Procena: ${num}% = ${percentageValue}`);
            return percentageValue; // Zamenjujemo procenat sa stvarnim brojem
          });

          // Dodavanje podrške za početne operatore
          if (/^[+\-*/]/.test(evalExpression)) {
            evalExpression = "0" + evalExpression;
          }

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

      // Ako je procenat pritisnut, odmah izračunavamo procenat
      if (value === '%') {
        // Ako imamo broj pre % simbola, odmah izračunavamo procenat
        if (expression && /^[\d\)]$/.test(expression.slice(-1))) {
          let lastNumber = expression.match(/\d+$/)[0]; // Uzmi poslednji broj pre % simbola
          let percentageValue = (parseFloat(lastNumber) / 100) * parseFloat(lastNumber); // Izračunaj vrednost procenta
          expression = expression.slice(0, -lastNumber.length) + percentageValue; // Zamenjujemo broj sa procentom
        }
      } else {
        expression += value;
      }

      display.value = expression;
      console.log(`Izraz nakon unosa: ${expression}`);
    }
  });
});
