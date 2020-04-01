// nejzákladnější test

/*

Napište test, který ukazuje chybu.
Napište kód, který vyhodí chybu s užitečnou hláškou o této chybě, ale pouze
pokud se chyba vyskytne.

Takže... if (zavolání sum() s nějakým číslem nevrátí správný výsledek) {
  pak vyhoď chybu s užitečnou hláškou
}

Pak spusťte tento kód pomocí `node 1.todo`

> Dejte pozor abyste byli ve správném adresáři.

Bonus: napište další test, který vyhodí chybu pokud je chyba ve funkci `subtract()`
*/

// funkce sum je schválně napsaná chybně, aby bylo možné vidět v testech chyby
const sum = (a, b) => a - b
const subtract = (a, b) => a - b
