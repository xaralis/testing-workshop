const React = require('react')
const ReactDOM = require('react-dom')
const renderer = require('react-test-renderer')
const {getFlyingSuperHeros} = require('../super-heros')
/*
Kompletní seznam assertions k dipozici tady: https://facebook.github.io/jest/docs/en/expect.html
*/

test('toBe', () => {
  // podobné jako ===
  expect(1).toBe(1)
  expect(true).toBe(true)
  // pozn.: všimněte si inverzi podmínky pomocí `.not`
  expect({}).not.toBe({})
})

test('toEqual', () => {
  // jako `lodash.isEqual`: https://lodash.com/docs/4.17.4#isEqual
  const subject = {a: {b: 'c'}, d: 'e'}
  const actual = {a: {b: 'c'}, d: 'e'}
  expect(subject).toEqual(actual)

  const subArray = [1, 2, {three: 'four', five: {six: 7}}]
  const actArray = [1, 2, {three: 'four', five: {six: 7}}]
  expect(subArray).toEqual(actArray)
})

test('toMatchObject', () => {
  // podobné `toEqual`, ale pro částečnou shodu, klíče navíc jsou OK
  const subject = {a: {b: 'c'}, d: 'e'}
  const actual = {a: {b: 'c'}}
  expect(subject).toMatchObject(actual)
  // chybějící klíče OK nejsou
  expect(actual).not.toMatchObject(subject)

  const subArray = [1, 2, {three: 'four', five: {six: 7}}]
  const actArray = [1, 2, {five: {six: 7}}]
  expect(subArray).toMatchObject(actArray)
})

test('toHaveBeenCalledTimes', () => {
  // Snadné vytvoření mock funkce, která nic nedělá
  const mockFn = jest.fn()
  expect(mockFn).toHaveBeenCalledTimes(0)

  mockFn()
  expect(mockFn).toHaveBeenCalledTimes(1)
})

test('toHaveBeenCalledWith', () => {
  const mockFn = jest.fn()
  mockFn('abc', {oneTwoThree: 123})
  // pozn.: používá toEqual (nikoliv toBe) na každý argument
  expect(mockFn).toHaveBeenCalledWith('abc', {oneTwoThree: 123})
})

test('toBeGreaterThan', () => {
  expect(10).toBeGreaterThan(3)
  expect(10).not.toBeGreaterThan(10)
  expect(10).toBeGreaterThanOrEqual(10)
})

test('toBeFalsy/Truthy', () => {
  expect(false).toBeFalsy()
  expect(true).toBeTruthy()
  expect(null).toBeFalsy()
  expect(undefined).toBeFalsy()
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('toEqual, toMatchObject, and toHaveBeenCalledWith matching a schema', () => {
  const birthday = {
    day: 18,
    month: 10,
    year: 1988,
    meta: {display: 'Oct 18th, 1988'},
  }
  const schema = {
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    meta: {display: expect.stringContaining('1988')},
    // existuje také expect.arrayContaining a expect.objectContaining
  }
  expect(birthday).toEqual(schema)
})

test('mock functions', () => {
  const myFn = jest.fn()
  myFn('first', {second: 'val'})

  const calls = myFn.mock.calls
  const firstCall = calls[0]
  const firstArg = firstCall[0]
  const secondArg = firstCall[1]
  // lze zapsat i jako one-liner:
  // const [[firstArg, secondArg]] = myFn.mock.calls

  expect(firstArg).toBe('first')
  expect(secondArg).toEqual({second: 'val'})
})

// Existují i další cesty jak vytvářet mock funkce/spies,
// na ty se podíváme později.

/*

Následují snapshot testy, na ty se podíváme později.














 */

test('manual "snapshot"', () => {
  const flyingHeros = getFlyingSuperHeros()
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
  ])
})

test('automatic snapshot', () => {
  const flyingHeros = getFlyingSuperHeros()
  expect(flyingHeros).toMatchSnapshot()
})

test('snapshot examples', () => {
  const object = {
    mixedArray: [1, [2, 3], {four: 5, six: [7, 8]}],
    regex: /do-not-try-to-regex-an-email/,
    date: new Date('1988-10-18'),
    error: new Error('some error'),
    someFunction: () => {},
    symbol: Symbol('symbol description'),
    set: new Set([1, 2, 3]),
    map: new Map([[{}, []], [[], {}]]),
    // a další!
  }
  expect(object).toMatchSnapshot()

  // A DOM NODY!!!
  const div = document.createElement('div')
  const title = '<h2 class="title">Super Heros are great!</h2>'
  const content =
    '<p class="content">We can each be a super hero for someone</p>'
  div.innerHTML = `<section>${title}${content}</section>`
  expect(div).toMatchSnapshot('title of a snapshot!')

  // A react elementy!
  const onClick = () => {}
  const element = React.createElement('button', {onClick}, 'Hello World')
  expect(element).toMatchSnapshot('react element')

  // A vyrenderované elementy!
  const rendered = renderer.create(element)
  expect(rendered).toMatchSnapshot('rendered')

  // a DOM nody renderované pomocí reactu
  const app = document.createElement('div')
  ReactDOM.render(element, app)
  expect(app).toMatchSnapshot('react-dom')
})
