/**
Váš úkol:

Otestujte případ, kde argument `items` je prázdný:
  <ItemList items={[]} />

Otestujte případ, kde `items` prázdný není:
  <ItemList items={['apple', 'orange', 'pear']} />

Příliš nad tím neuvažujte, jde jen o zahřívací kolo pro testování React
komponent v dalším workshopu.

Můžete používat JSX (které bude transpilováno do volání React.createElement):
import React from 'react'

Abyste pak mohli renderovat komponentu v testech:
import ReactDOM from 'react-dom'

Abyste pak mohli vytvořit React element pro vámi testovanou komponentu:
import ItemList from '../item-list'

Tady je základní postup pro váš první test:

- Vytvořte "container" kam vaši komponentu vyrenderujte (tip: použijte document.createElement('div'))
- Vyrenderujte vaši komponentu (tip: použijte ReactDOM.render(JSX, container))
- Použijte assertions na property `textContent` containeru
  (tip: expect().toMatch() by mohlo být to co chcete, např.: `expect('some text content').toMatch('text')`)

Druhý test bude velmi podobný tomu prvnímu.
*/

test("ItemList without items", () => {

})

test("ItemList with items provided", () => {

})
