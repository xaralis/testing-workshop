// tvorba assertion knihovny
/*

Nyní pojďme implementovat vlastní assertion knihovnu.
Vytvořme funkci nazvanou `expect`, která přijímá hodnotu a vrátí objekt s
různými assertion metodami.

Tip: Bylo by hezké, kdyby ji šlo používat následovně:

> expect(actual).toBe(expected)

Nakonec spusťte tento kód pomocí `node 2.todo`

> Dejte pozor abyste byli ve správném adresáři.

 */

const {sum, subtract} = require('./math')

let result, expected

result = sum(3, 7)
expected = 10
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`)
}

result = subtract(7, 3)
expected = 4
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`)
}
