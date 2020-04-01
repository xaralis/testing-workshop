# ⚛️ Testování aplikací v Reactu

Vítáme tě v sérii workshopu na téma testování aplikací v Reactu.

## Obsah

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [⚛️ Testování aplikací v Reactu](#️-testování-aplikací-v-reactu)
  * [Obsah](#obsah)
  * [Začátek](#začátek)
    * [Systémové požadavky](#systémové-požadavky)
    * [Nastavení projektu](#nastavení-projektu)
    * [Spuštění aplikace](#spuštění-aplikace)
    * [Základní struktura aplikace](#základní-struktura-aplikace)
  * [Workshop #1: Úvod do testování](#workshop-1-Úvod-do-testování)
    * [Co je to test?](#co-je-to-test)
    * [Code Coverage](#code-coverage)
    * [Intro do frameworku Jest](#intro-do-frameworku-jest)
    * [Základní testování React komponent](#základní-testování-react-komponent)
  * [Workshop #2: Unit a integrační testy](#workshop-2-unit-a-integrační-testy)
    * [Konfigurace Jestu](#konfigurace-jestu)
    * [Unit testy komponent](#unit-testy-komponent)
    * [Efektivní snapshot testing](#efektivní-snapshot-testing)
    * [Integrační testování celých stránek](#integrační-testování-celých-stránek)
  * [Workshop #3: End-To-End testování pomocí Cypress](#workshop-3-end-to-end-testování-pomocí-cypress)
    * [Konfigurace Cypressu](#konfigurace-cypressu)
    * [E2E testování](#e2e-testování)
  * [Odstraňování problémů](#odstraňování-problémů)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Začátek

Nejprve si zkontrolujte, že máte nainstalovány potřebné systémové závislosti a
nainstalujte si celý projekt. Pokud je to možné, celý setup proveďte ještě **před
vlastním workshopem** abychom pak ušetřili čas!

### Systémové požadavky

* [git][git] v2.14.1 nebo vyšší
* [NodeJS][node] v8.9.4 nebo vyšší
* [npm][npm] v5.6.0 nebo vyšší

Všechny musí být dostupné na vaší `PATH`. Pro ověření, že je vše nastaveno správně
můžete spustit následující příkazy:

```
git --version
node --version
npm --version
```

Pokud něco nefunguje jak by mělo, další informace jak nastavit `PATH` env variable
a jak to opravit najdete tady pro [windows][win-path] nebo pro [mac/linux][mac-path]:

### Nastavení projektu

Poté, co sis ověřil/a, že je vše správně nainstalováno, mělo by být možné
spustit následující příkazy, pomocí kterých si spustíte celý projekt:

```
git clone https://github.com/xaralis/testing-workshop.git
cd testing-workshop
git checkout aws
npm run setup --silent
```

Poslední příkaz může chvíli trvat. Pokud dojde k nějaké chybě, zkuste zjistit v
čem je problém a jestli ho nezvládneš vyřešit svépomocí. Pomoci může i sekce
[Odstraňování problémů](#odstranovani-problemu). Když si nebudeš vědět rady, zeptej se.

### Spuštění aplikace

Aplikaci, která nám poslouží jako základ pro výuku testování, spustíte následovně:

```shell
npm run dev
```

Tím se spustí jak backendový API server, tak i server pro client-side kód v
development módu. Tvůj browser by měl po chvíli automaticky otevřít
`http://localhost:3000` s běžící testovací aplikací. Pokud se tak nestane,
otevři ho ručně.

Mělo by to vypadat takhle:

<img src="other/screenshot.png" alt="App Screenshot" title="App Screenshot" width="700" />

Pokud se to nepodaří, zkus věnovat nějaký čas chybovým hláškám v terminálu,
zda to nevyřešíš svépomocí a radši ještě projdi sekci
[Odstraňování problémů](#odstranovani-problemu). Když si nebudeš vědět rady,
zeptej se.

### Základní struktura aplikace

Tato aplikace má 3 základní části, ze kterých je sestavená:

1.  client - běží v browseru, entrypoint: `client/src/index.js`
2.  server - běží na serveru, entrypoint: `server/index.js`
3.  shared - sdílené části pro browser i server, entrypoint: `shared/index.js`

Pro spouštění věcí budeš v tomhle workshopu používat
[`npm skripty`](https://docs.npmjs.com/misc/scripts). Spuštěním `npm run`
získáš seznam všech dostupných skriptů. Hlavní z nich jsou následující:

1.  `npm run dev` - spustí dev server, což ti umožní používat testovací aplikaci
2.  `npm run test` - spustí unit a integrační testy v Jest watch módu
3.  `npm run test:e2e` - spustí e2e testy pomocí Cypressu v dev módu

## Workshop #1: Úvod do testování

* Základní informace o tom co je jsou to testy a k čemu jsou
* Co je to code coverage a jak s ní zacházet
* Základní testování v Jest frameworku

### Co je to test?

Než začneme s testováním pomocí různých frameworků, je vhodné si vysvětlit
co to vlastně test je. V terminálu si otevřete adresář `other/whats-a-test`
a otevřete `1.todo.js` ve vašem editoru. Pokračujte dle instrukcí až k
`4.todo.js`. Řešení pro jednotlivé úlohy naleznete v příslušných `.solution.js` souborech.

Pokud vás zajímá více, můžete si přečíst třeba tento článek:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

**Co jsme se dozvěděli**:

* Assertion: Cesta jak říct jak by něco mělo fungovat. Pokud to není dodrženo,
  vyhodí chybu což způsobí failnutí testu.

**Co si odnést**:

* Testy jsou kód, který spouští jiný kód a využívá při tom „assertions“.
* Testovací framework toto abstrahují, abychom mohli psát testy rychleji a lépe.
* Testy slouží k tomu, abychom získali důvěru, že náš kód dělá to co by měl.

### Code Coverage

Podívejte se na `other/coverage-example`. Otevřete si soubor `example.js` a
porovnejte ho s `example.coverage.js`. Varianta s coverage obsahuje proměnnou, která
hlídá všechna místa v kódu, kam se lze dostat. Otevřete
`coverage/lcov-report/index.html` v browseru abyste viděli jaký report se
pomocí této statistiky dá vytvořit.

**Co jsme se dozvěděli**:

* Branch: větev kódu. Příklady: `if`, `else`, `ternary`, `switch`.
* Statement: syntaktický výraz, který může být spuštěn. Příklad: volání funkce, přiřazení proměnné.
* Řádky: [Nejsou moc podstatné, všímejte si spíš statementů](https://github.com/gotwarlost/istanbul/issues/639)
* Funkce: Zda byla funkce zavolána

**Co si odnést**:

* Coverage je užitečná metrika, která ukazuje, které části kódu se během testů
  nespustily.
* Jedná se pouze o indikátor a neměli bychom jej zaměňovat za předpoklad, že vše
  co je pokryto také správně funguje.
* Snaha udržet 100% pokrytí je mnohdy zbytečná a často kontraproduktivní.
  Rozumná míra je 70% pro běžné aplikace. Pokud však vyvíjíte knihovnu, kterou
  budou používat další lidé, je na místě snažit se o co nejvyšší pokrytí, klidně
  i 100%.

### Intro do frameworku Jest

Jest je framework pro spouštění testů, který obsahuje řadu užitečných nástrojů
v podobě hotových assertions nebo třeba nástrojů pro mockování.

1.  Otevřete `other/jest-expect/__tests__/expect-assertions.js`
2.  Spusťte `npm run test:expect`
3.  Projděte si různé druhy assertions (mělo by to být na chvilku)

**Co si odnést**:

* Jest obsahuje řadu již připravených assertions, celý seznam je zde: https://facebook.github.io/jest/docs/en/expect.html

### Základní testování React komponent

Abychom si ukázali i příklad testování Reactu, kvůli kterému tu jsme především,
jako poslední cvičení si zkusíme otestovat jednoduchou React komponentu.

**Cvičení**:

* Spusťe si testy v Jest watch módu pomocí `npm run test:react`
* Otevřete `other/simple-react/item-list.js` a `other/simple-react/__tests__/item-list.todo.js`
* V `item-list.todo.js` postupujte dle instrukcí, můžete využít `item-list.js` pokud si nevíte rady

**Co si odnést**

* Základní princip je vyrenderovat komponentu a přidat asserty na to jak byla vyrenderována.
* Pokud by byla ve vaší celé aplikaci jen tato komponenta, zkuste ji využívat
  stejně jako by to dělal uživatel. To vám dá základní případy toho, co je
  vhodné otestovat.

## Workshop #2: Unit a integrační testy

* Konfigurace Jestu pro client-side projekt v Reactu
* Psaní unit testů pro Javascriptové utility a React komponenty
* Co je to snapshot testování a jak jej používat efektivně
* Psaní integračních testů pro React komponenty

### Konfigurace Jestu

**Nové věci**:

* Code Coverage: Statistika, kterou používáme abychom věděli, jak velká část
  našeho kódu byla nějak využita během průchodu unit testy. 70% je vhodné číslo
  pro aplikace, v případě knihoven je dobré cílit na 100%.

**Instrukce**:

* Přejděte na `./other/configuration/calculator`
* Spusťte `npm run dev` a otevřete `localhost:8080` pro zobrazení appky
* Nainstalujte jest pomocí `npm install --save-dev jest`
* Nastavte `test` skript v `package.json` na `jest`
* Spusťte `npm test` -- No files found matching the default `testMatch`
* Zkopírujte `src/__tests__/utils.js` z `calculator.solution`
* Spusťte `npm test` -- Selže kvůli syntax error s ES Moduly, které jsme pro webpack vypnuli
* Aktualizujte `.babelrc.js` a nastavte `modules: 'commonjs'` v test módu.
* Spusťte `npm test` -- funguje!
* Přidejte `console.log(window)`
* Spusťte `npm test` -- a všimněte si velikánského výpisu window objektu
* Vytvořte `jest` property v `package.json` and přidejte `testEnvironment: 'node'`.
* Spusťte `npm test` -- všimněte si hlášky `window is not defined` což je to co chceme pro Node.js.
* Odstraňte `console.log(window)`

Nyní si poradíme s CSS importy:

* Zkopírujte `src/__tests__/auto-scaling-text.js` z `calculator.solution`
* Spusťte `npm test` -- Selže kvůli importu CSS
* Vytvořte `jest.config.js` a přesuňte do něj jest konfiguraci z `package.json`.
* Přidejte `moduleNameMapper` tak aby matchoval `.css`. Namapujte jej na `require.resolve('./test/style-mock')`
* Vytvořte `style-mock.js` v adresáři `test`. Nepotřebuje mít žádný obsah.
* Spusťte `npm test` -- původní chyba je pryč! CSS importy fungují, ale nyní to hlásí `document is not defined`.
* V `jest.config.js` upravte sekci `testEnvironment: 'jsdom'`.
* Spusťte `npm test` -- funguje!

Zkusme nyní CSS importy trochu vylepšit:

* Přidejte `console.log(div.outerHTML)` a všimněte si, že chybí className, protože náš style mock vrací jen prázdný objekt pro naše CSS moduly
* Nainstalujte `npm install --save-dev identity-obj-proxy`
* Přidejte `moduleNameMapper` do `jest.config.js` který matchuje `.module.css` a mapuje jej na `identity-obj-proxy` (musí být uvedeno PŘED stávající deklarací).
* Spusťte `npm test` -- zobrazuje `class`!
* Odstraňte `console.log`.

Nyní vyřešíme dynamické importy:

* Zkopírujte `src/__tests__/calculator.js` z `calculator.solution`
* Spusťte `npm test` -- selže kvůli syntax error v dynamickém importu
* Nainstalujte babel plugin `npm install --save-dev babel-plugin-dynamic-import-node`
* Zaktualizujte `.babelrc.js` aby používal `dynamic-import-node` v testech
* Spusťte `npm test` -- selže, protože `window.localStorage` JSDOM nepodporuje!
* Zkopírujte `test/setup-test-framework.js` z `calculator.solution`
* Upravte `jest.config.js` aby zahrnoval `setupTestFrameworkScriptFile` které ukazuje na `require.resolve('./test/setup-test-framework')`
* Spusťte `npm test` -- funguje!

Čas na code coverage:

* Zaktualizujte `test` skript v `package.json` aby byl `jest --coverage`
* Spusťte `npm test` -- funguje a zahrnuje i code coverage!
* Otevřete `./coverage/lcov-report/index.html` v browseru. Super, ne!? Bohužel ale zahrnuje i další soubory mimo zdrojový kód.
* Zaktualizujte `jest.config.js` a přidejte property `collectCoverageFrom`, která odpovídá: `['**/src/**/*.js']`
* Spusťte `npm test` -- funguje a zahrnuje coverage jen v souborech, které nás zajímají.

Nastavme limit code coverage:

* Upravte `jest.config.js` aby obsahoval property `coverageThreshold` a nastavte limit 70% pro statements, branches, functions i lines.and lines.
* Spusťte `npm test` -- selže, protože coverage nesplňuje daný limit
* Upravte `jest.config.js` aby obsahoval limit `coverageThreshold` se kterým to projde
* Spusťte `npm test` -- funguje!

Nyní zapneme watch mód:

* Přidejte `test:watch` skript do `package.json` a nastavte jej na `jest --watch`
* Spusťte `npm run test:watch`
* Vyzkoušejte se Jest watch mód

**Co si odnést**:

* Nainstalovali jsme závislosti pro testování: `jest`, `identity-obj-proxy` a `babel-plugin-dynamic-import-node`
* Code coverage vygenerujete s `jest --coverage`
* Watch mód spustíte pomocí `jest --watch`
* Konfigurace jestu buď v `jest.config.js`, pomocí `--config`, nebo pomocí `jest` property v `package.json`:
  * `"testEnvironment": "jest-environment-node"` pokud nepotřebujete `jsdom`
  * `collectCoverageFrom` nastavuje kde se bude sbírat coverage (některé části můžete ignorovat pomocí `coveragePathIgnorePatterns`)
  * `coverageThresholds` zajistí, aby coverage nespadla příliš nízko

### Unit testy komponent

**Instrukce**:

1.  Otevřete `client/src/screens/editor.todo.js` a `client/src/screens/__tests__/editor.todo.js`
2.  Spusťte testy pomocí `npm test editor.todo`
3.  Implementujte test (vyjma snapshotového)

**Cvičení**:

1.  Otevřete `client/src/components/login.js` a `client/src/components/__tests__/login.step-1.todo.js`
2.  Spusťte testy pomocí `npm test login.step-1.todo`
3.  Implementujte test loginu

_volitelné_

1.  Otevřete `client/src/components/__tests__/login.step-2.todo.js`
2.  Spusťte testy pomocí `npm test login.step-2.todo`
3.  Využijte poskytnuté utility

### Efektivní snapshot testing

**Instrukce**:

1.  Vysvětlete co je to vlastně snapshot testování (otevřete `other/jest-expect/__tests__/expect-assertions.js` a projděte snapshot examply)
2.  Otevřete `client/src/screens/editor.todo.js` a `client/src/screens/__tests__/editor.todo.js`
3.  Spusťte testy pomocí `npm test editor.todo`
4.  Implementujte snapshot test

**Cvičení**:

1.  Otevřete `client/src/components/login.js` a `client/src/components/__tests__/login.step-1.todo.js`
2.  Spusťte testy pomocí `npm test login.step-3.todo`
3.  Implementujte snapshot test

### Integrační testování celých stránek

**Instrukce**:

1.  Prozkoumejte trochu kód aplikace. Začněte na `client/src/app.js`
2.  Otevřete `client/src/__tests__/app.register.todo.js`
3.  Spusťte test pomocí `npm test app.register.todo`
4.  Implementujte integrační test

**Cvičení**:

1.  Otevřete `client/src/__tests__/app.login.todo.js`
2.  Spusťte testy pomocí `npm test app.login.todo`
3.  Implementujte integrační test

## Workshop #3: End-To-End testování pomocí Cypress

* Konfigurace Cypressu pro webovou aplikaci
* Psaní E2E (end-to-end) testů v Cypressu

### Konfigurace Cypressu

**Instrukce**:

1.  Přepněte se do adresáře `other/configuration/calculator` (další adresáře jsou uváděné relativně)
2.  Spusťte `npm install --save-dev cypress`
3.  Spusťte `npx cypress open`. Trochu si s tím pohrajte, pak ukončete.
4.  Prozkoumejte `./cypress`

Nyní Cypress spustíme nad naší codebase

1.  Spusťte dev server v jednom tabu pomocí `npm run dev`. Běží na portu `8080`
2.  Otevřete `./cypress.json` a přidejte `"baseUrl": "http://localhost:8080"` a `"integrationFolder": "cypress/e2e"`
3.  Spusťte `npm install --save-dev cypress-testing-library`
4.  Upravte `cypress/support/index.js` aby importoval `cypress-testing-library/add-commands`
5.  Smažte `./cypress/integration` a zkopírujte `../calculator.solution/e2e/calculator.js` do `./cypress/e2e/calculator.js`
6.  Znovu spusťte cypress: `npx cypress open` a spusťte test. Funguje!

Nyní z toho uděláme skript

1.  `npm install --save-dev npm-run-all`
2.  Přidejte `test:e2e:dev` skript: `npm-run-all --parallel --race dev cy:open`
3.  Přidejte `cy:open` skript: `cypress open`
4.  Spusťte `npm run test:e2e:dev`. Funguje!

Nyní zajistíme, aby to fungovalo i na CI

1.  Přidejte `test:e2e` skript: `npm-run-all --parallel --race start cy:run`
2.  Přidejte `cy:run` skript: `cypress run`
3.  Přidejte `pretest:e2e` skript: `npm run build`
4.  Spusťte `npm run test:e2e`. Funguje!

### E2E testování

**Novinky**:

* Nový skript je `npm run test:e2e`
* Cypress používá pro testy sémantiku podobnou frameworku mocha (`describe` a `it`)
* Cypress používá knihovnu pro assertions, která je podobná frameworku chai.
* Cypress má interní frontový systém pro zadávání příkazů. Každý příkaz vrací
  subjekt, na kterém lze pouštět další příkazy.. Nejlepší je `cy` globální
  proměnnou vnímat jako `uživatele`, kterému zadáváte instrukce co má dělat
  dál. Ve většině případů prostě řetězíte jednotlivé pokyny pokud nechcete začít řešit jiný úkol.
  [Více informací](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Subject-Management)

**Instrukce**:

1.  Otevřete `cypress/e2e/auth.register.todo.js` a spusťte `npm run test:e2e`
2.  Spusťte testy `auth.register.todo.js`
3.  Implementujte test registrace

**Cvičení**:

1.  Otevřete `cypress/e2e/auth.login.todo.js` a spusťte `npm run test:e2e`
2.  Spusťte testy `auth.login.todo.js`
3.  Implementujte test přihlašování

**Co si odnést**:

* Po tom, co jste ověřili, že registrace funguje, je lepší se vyhnout vytváření
  bottlenecků použitím utility na registraci uživatele místo toho, abyste registraci
  vždycky prováděli pomocí průchodu UI.
* E2E testy vám umožňují testovat aplikaci jako byste byli skutečný uživatel,
  což vám dává MNOHEM větší jistotu, že vaše aplikace tak bude pro uživatele
  skutečně fungovat.
* Cypress má SKVĚLÉ UX pro psaní E2E testů!

## Odstraňování problémů

<details>

<summary>"npm run setup" nefunguje</summary>

Setup skript postupně spouští následující příkazy. Zkus spustit každý samostatně
aby zjistil/a, kde je problém:

```
# ověření prostředí na tvém počítačí
node ./scripts/verify

# instalace závislostí v rootu repository
npm install

# instalace závislostí v shared adresáři
npm install --prefix shared

# instalace závislostí v server adresáři
npm install --prefix server

# instalace závislostí v client adresáři
npm install --prefix client

# ověření, že projekt lze spustit
npm run lint
npm run test:coverage
npm run test:e2e:run
```

Pokud kterýkoliv z těchto skriptů selže, zkus zjistít čím to je. Pokud si
nebudeš vědět rady, zeptej se.

</details>

<details>

<summary>"npm run dev" nefunguje</summary>

Pokud tenhle příkaz nefunguje, můžeš zkusit spustit následující příkazy
jednotlivě (v samostatných terminálech):

```
cd server
npm run dev
```

```
cd client
npm run dev
```

Pokud kterýkoliv z těchto skriptů selže, zkus zjistít čím to je. Pokud si
nebudeš vědět rady, zeptej se.

</details>

<details>

<summary>"npm test" nefunguje; "./jest" nefunguje</summary>

Může se stát, že při spuštění Jestu ve watch módu se objeví chyba, která říká
něco jako:

```
`fsevents` unavailable (this watcher can only be used on Darwin)'
```

Jest watch mód závisí na nástroji zvaném `watchman`, který musí být
nainstalován globálně na tvém stroji.

Chybu opravíš tím, že si [nainstaluješ watchman][watchman].

Pozn: instalace `watchman` skrze `npm` nejspíš nainstaluje zastaralou verzi
balíčku. Je lepší balíček nainstalovat pomocí odkazu výše.

</details>

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
[watchman]: https://facebook.github.io/watchman/docs/install.html
