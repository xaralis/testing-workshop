// píšeme framework na testování
/*

Pojďme trochu vylepšit naše chybové hlášky. Vytvořme funkci `test`, která
může mít titulek a callback.

Poté přidejme try/catch blok takže můžeme zalogovat titulek společně s chybou
či úspěchem.

Nakonec každý z našich testů zabalíme do volání funkce `test`.

To mimochodem také znamená, že můžeme spustit všechny testy, i když některé z
nich selžou!

Příklad funkce test:

test(title, () => {
  // arrange
  // act
  // assert
}

Nakonec spusťte tento kód pomocí `node 3.todo`

> Dejte pozor abyste byli ve správném adresáři.

 */

const {sum, subtract} = require('./math')

let result, expected

result = sum(3, 7)
expected = 10
expect(result).toBe(expected)

result = subtract(7, 3)
expected = 4
expect(result).toBe(expected)

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    },
  }
}
