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

          // Obrada procenata: Ako je procenat prisutan, odmah ga zamenjujemo sa stvarnim brojem
          let evalExpression = expression.replace(/(\d+)\s?([+\-*/])\s?(\d+)%/g, (match, num1, operator, num2) => {
            let percentage = (parseFloat(num2) / 100) * parseFloat(num1); // Izračunavanje procenta
            console.log(`Procena: ${num1} ${operator} ${num2}% = ${percentage}`);
            return `${num1} ${operator} ${percentage}`; // Zamena procenata sa stvarnim brojem
          });

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

      // Ako je procenat pritisnut, dodajemo procenat kao znak
      if (value === '%') {
        // Da bi procenat radio, potrebno je povezati broj sa % i zameniti ga
        if (expression && /^[\d\)]$/.test(expression.slice(-1))) {
          // Zamenjujemo procenat sa stvarnim brojem (ne prikazujemo znak %)
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
