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

          // Obrada procenata: Ako je procenat prisutan, izračunavamo stvarnu vrednost.
          let evalExpression = expression.replace(/(\d+)\s?([+\-*/])\s?(\d+)%/g, (match, num1, operator, num2) => {
            let percentage = (parseFloat(num2) / 100) * parseFloat(num1); // Izračunavanje procenta
            console.log(`Procena: ${num1} ${operator} ${num2}% = ${percentage}`);
            return `${num1} ${operator} ${percentage}`;
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
        // Ako imamo broj pre %, odmah izračunavamo procenat
        if (expression && /^[\d\)]$/.test(expression.slice(-1))) {
          let lastNumber = expression.match(/\d+$/)[0]; // Uzmi poslednji broj
          let percentageValue = (parseFloat(lastNumber) / 100) * parseFloat(lastNumber); // Izračunaj procenat
          expression = expression.slice(0, -lastNumber.length) + percentageValue; // Zamenjujemo procenat sa stvarnim brojem
          display.value = expression; // Ažuriramo ekran odmah
        }
      } else {
        expression += value;
      }

      display.value = expression;
      console.log(`Izraz nakon unosa: ${expression}`);
    }
  });
});
