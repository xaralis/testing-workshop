// Nyní odstraníme náš malý framework a místo toho testy pustíme pomocí frameworku Jest.
// Spusťte `./jest`
const {sum, subtract} = require('./math')

test('sum adds numbers', () => {
  const result = sum(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})

test('subtract subtracts numbers', () => {
  const result = subtract(7, 3)
  const expected = 4
  expect(result).toBe(expected)
})
