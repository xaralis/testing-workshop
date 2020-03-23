# ⚛️ Testování aplikací v Reactu

Vítáme tě na workshopu testování aplikací v Reactu.

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
  * [Témata workshopu](#témata-workshopu)
    * [Co je to test?](#co-je-to-test)
    * [Intro do frameworku Jest](#intro-do-frameworku-jest)
    * [Testing a React Component](#testing-a-react-component)
    * [Configuring Jest](#configuring-jest)
    * [Unit testing components](#unit-testing-components)
    * [Effective Snapshot Testing](#effective-snapshot-testing)
    * [Integration testing pages](#integration-testing-pages)
    * [Configuring Cypress](#configuring-cypress)
    * [End-to-end testing](#end-to-end-testing)
    * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration)
  * [Shared Content](#shared-content)
    * [What's a test](#whats-a-test)
    * [What types of testing are there?](#what-types-of-testing-are-there)
    * [Jest](#jest)
      * [Code Coverage](#code-coverage)
    * [Write tests. Not too many. Mostly integration.](#write-tests-not-too-many-mostly-integration-1)
  * [Odstraňování problémů](#odstraňování-problémů)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Začátek

Nejprve si zkontrolujte, že máte nainstalovány potřebné systémové závislosti.

## Systémové požadavky

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

## Nastavení projektu

Poté, co sis ověřil/a, že je vše správně nainstalováno, mělo by být možné
spustit následující příkazy, pomocí kterých si spustíte celý projekt:

```
git clone https://github.com/xaralis/testing-workshop.git
cd testing-workshop
npm run setup --silent
```

Poslední příkaz může chvíli trvat. Pokud dojde k nějaké chybě, zkuste zjistit v
čem je problém a jestli ho nezvládneš vyřešit svépomocí. Pomoci může i sekce
[Odstraňování problémů](#odstranovani-problemu). Když si nebudeš vědět rady, zeptej se.

## Spuštění aplikace

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

## Základní struktura aplikace

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

## Témata workshopu

* Základní informace o tom co je jsou to testy a k čemu jsou
* Konfigurace Jestu pro client-side projekt v Reactu
* Co je to code coverage a jak s ní zacházet
* Psaní unit testů pro Javascriptové utility a React komponenty
* Co je to snapshot testování a jak jej používat efektivně
* Psaní integračních testů pro React komponenty
* Konfigurace Cypressu pro webovou aplikaci
* Psaní E2E (end-to-end) testů v Cypressu

### Co je to test?

Než začneme s testováním pomocí různých frameworků, je vhodné si vysvětlit
co to vlastně test je. V terminálu si otevřete adresář `other/whats-a-test`
a otevřete `1.js` ve vašem editoru. Pokračujte dle instrukcí až k
`4.js`. Řešení pro jednotlivé úlohy naleznete v příslušných `.solution.js` souborech.

Pokud vás zajímá více, můžete si přečíst třeba tento článek:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

**Co jsme se dozvěděli**:

* Assertion: Cesta jak říct jak by něco mělo fungovat. Pokud to není dodrženo, vyhodí chybu což způsobí failnutí testu.

**Co si odnést**:

* Testy jsou kód, který spouští jiný kód a využívá při tom „assertions“.
* Testovací framework toto abstrahují, abychom mohli psát testy rychleji a lépe.
* Testy slouží k tomu, abychom získali důvěru, že náš kód dělá to co by měl.

### Intro do frameworku Jest

Jest je framework pro spouštění testů, který obsahuje řadu užitečných nástrojů
v podobě hotových assertions nebo třeba nástrojů pro mockování.

1.  Otevřete `other/jest-expect/__tests__/expect-assertions.js`
2.  Spusťte `npm run test:expect`
3.  Projděte si různé druhy assertions (mělo by to být na chvilku)

**Co si odnést**:

* Jest obsahuje řadu již připravených assertions, celý seznam je zde: https://facebook.github.io/jest/docs/en/expect.html

### Testing a React Component

**Instruction**:

* Nothing much here, direct people to the exercise and inform them they can
  use the solution for reference

**Exercise**:

* Start the simple react tests in watch mode with `npm run test:react`
* Open `other/simple-react/item-list.js` and `other/simple-react/__tests__/item-list.todo.js`
* Follow the instructions to test the component

**Takeaways**

* The key here is to render the component and assert on the output.
* Assuming this were the only component for your entire application, attempt to
  use it the way the user would and let that inform your decisions of how you
  test it.

### Configuring Jest

**New Things**:

* Code Coverage: A mechanism for us to understand how much of our code is run
  during the unit tests. 100% for libs, 70%ish for applications.

**Instruction**:

* Navigate to `./other/configuration/calculator`
* Go ahead and run `npm run dev` and open up `localhost:8080` to see the app
* `npm install --save-dev jest`
* Create a `test` script in `package.json` to `jest`
* Run `npm test` -- No files found matching the default `testMatch`
* Copy over `src/__tests__/utils.js` from `calculator.solution`
* Run `npm test` -- Fails due to syntax error with ES Modules which we have disabled for webpack
* Update `.babelrc.js` to have `modules: 'commonjs'` in test mode.
* Run `npm test` -- It works!
* Add `console.log(window)`
* Run `npm test` -- notice the huge window object is printed
* Create a `jest` object property in `package.json` and add `testEnvironment: 'node'`.
* Run `npm test` -- notice it fails with `window is not defined` which is what we want for node.
* Remove `console.log(window)`

Now let's deal with CSS imports:

* Copy `src/__tests__/auto-scaling-text.js` from `calculator.solution`
* Run `npm test` -- Fails because of the import of css
* Create `jest.config.js` and move config from `package.json` to that file.
* Add `moduleNameMapper` to match `.css`. Map it to `require.resolve('./test/style-mock')`
* Create `style-mock.js` in `test` directory. It needs no contents.
* Run `npm test` -- The old error is gone! CSS importing is working, but now we're getting `document is not defined`.
* Update `jest.config.js` to `testEnvironment: 'jsdom'`.
* Run `npm test` -- Passes!

Let's improve the CSS imports a bit:

* Add `console.log(div.outerHTML)` and notice there is no className because our style mock just returns an empty object for our css modules (I'm actually not sure why the style prop doesn't appear there... I guess React's not using the style attribute to apply those style properties?)
* `npm install --save-dev identity-obj-proxy`
* Add `moduleNameMapper` to `jest.config.js` that matches `.module.css` and maps to `identity-obj-proxy` (must come BEFORE the other one).
* Run `npm test` -- Shows the `class`!
* Remove the `console.log` because it's annoying.

Let's handle dynamic imports:

* Copy `src/__tests__/calculator.js` from `calculator.solution`
* Run `npm test` -- Fails due to syntax error on dynamic import
* `npm install --save-dev babel-plugin-dynamic-import-node`
* Update `.babelrc.js` to use `dynamic-import-node` when in tests
* Run `npm test` -- Fails because `window.localStorage` is not supported by JSDOM!
* Copy `test/setup-test-framework.js` from `calculator.solution`
* Update `jest.config.js` to have a `setupTestFrameworkScriptFile` that points to `require.resolve('./test/setup-test-framework')`
* Run `npm test` -- Passes!

Ok! Now time for coverage!

* Update the `test` script in `package.json` to be `jest --coverage`
* Run `npm test` -- Passes and includes coverage!
* Open `./coverage/lcov-report/index.html` in a browser. Neat right!? It includes non-source files though
* Update `jest.config.js` with a `collectCoverageFrom` that is: `['**/src/**/*.js']`
* Run `npm test` -- Passes and includes coverage for only the files we care about.

Let's lock in our coverage!

* Update `jest.config.js` to have a `coverageThreshold` of 70% for statements, branches, functions, and lines.
* Run `npm test` -- Fails due to coverage threshold requirements
* Update `jest.config.js` to have a more reasonable `coverageThreshold`
* Run `npm test` -- Passes!

Let's turn on watch mode!

* Add a `test:watch` script to `package.json` and set it to `jest --watch`
* Run `npm run test:watch`
* Explore Jest's amazing watch mode

**Exercise**:

> No exercise here. It would be really boring I think...

**Takeaways**:

* Dependencies installed: `jest`, `identity-obj-proxy`, and `babel-plugin-dynamic-import-node`
* Get code coverage with: `jest --coverage`
* Watch mode with: `jest --watch`
* Configure jest with `jest.config.js`, `--config`, or `package.json` `jest` property:
  * `"testEnvironment": "jest-environment-node"` if you don't need `jsdom`
  * `collectCoverageFrom` to collect coverage numbers on your whole codebase (`coveragePathIgnorePatterns` can ignore some)
  * `coverageThresholds` to keep your coverage from falling

### Unit testing components

**Instruction**:

1.  Open `client/src/screens/editor.todo.js` and `client/src/screens/__tests__/editor.todo.js`
2.  Run the tests with `npm test editor.todo`
3.  Implement the test (not the snapshot yet)

**Exercise**:

1.  Open `client/src/components/login.js` and `client/src/components/__tests__/login.step-1.todo.js`
2.  Run the tests with `npm test login.step-1.todo`
3.  Implement the login test

_optional_

4.  Open `client/src/components/__tests__/login.step-2.todo.js`
5.  Run the tests with `npm test login.step-2.todo`
6.  Use the utilities provided

**Takeaways**:

* TODO

### Effective Snapshot Testing

**Instruction**:

1.  Start by explaining what snapshot tests even are (open `other/jest-expect/__tests__/expect-assertions.js` and go through the snapshots examples)
2.  Open `client/src/screens/editor.todo.js` and `client/src/screens/__tests__/editor.todo.js`
3.  Run the tests with `npm test editor.todo`
4.  Implement the snapshot test

**Exercise**:

1.  Open `client/src/components/login.js` and `client/src/components/__tests__/login.step-1.todo.js`
2.  Run the tests with `npm test login.step-3.todo`
3.  Implement the snapshot test

**Takeaways**:

* TODO

### Integration testing pages

**Instruction**:

1.  Explore the app code a little bit. Start at `client/src/app.js`
2.  Open `client/src/__tests__/app.register.todo.js`
3.  Run the tests with `npm test app.register.todo`
4.  Implement the integration test

**Exercise**:

1.  Open `client/src/__tests__/app.login.todo.js`
2.  Run the tests with `npm test app.login.todo`
3.  Implement the integration test

**Takeaways**:

* TODO

### Configuring Cypress

**Instructions**:

1.  Change directories to `other/configuration/calculator` (further directories relative to this)
2.  Run `npm install --save-dev cypress`
3.  Run `npx cypress open`. Play around with it, then stop the process.
4.  Explore `./cypress`

Now let's have it run on our codebase

1.  In one terminal tab/window start the dev server `npm run dev`. Note this is running on port `8080`
2.  Open `./cypress.json` and add `"baseUrl": "http://localhost:8080"` and `"integrationFolder": "cypress/e2e"`
3.  `npm install --save-dev cypress-testing-library`
4.  Update `cypress/support/index.js` to import `cypress-testing-library/add-commands`
5.  Delete `./cypress/integration` and copy `../calculator.solution/e2e/calculator.js` to `./cypress/e2e/calculator.js`
6.  Start cypress over again: `npx cypress open` and run the test. It passes!

Now let's make this a script

1.  `npm install --save-dev npm-run-all`
2.  Add a `test:e2e:dev` script: `npm-run-all --parallel --race dev cy:open`
3.  Add a `cy:open` script: `cypress open`
4.  Run `npm run test:e2e:dev`. It works!

Now let's make this work for CI

1.  Add a `test:e2e` script: `npm-run-all --parallel --race start cy:run`
2.  Add a `cy:run` script: `cypress run`
3.  Add a `pretest:e2e` script: `npm run build`
4.  Run `npm run test:e2e`. It works!

**Exercise**:

> No exercise here. It would be really boring I think...

**Takeaways**:

* TODO

### End-to-end testing

**New Things**:

* The new script is `npm run test:e2e`
* Cypress uses a mocha-like framework for tests (`describe`, and `it`)
* Cypress uses a chai-like assertion library.
* Cypress has an internal queueing system for it's commands. Each command can
  yield a subject which allows you to execute commands on that subject. Think
  of the `cy` global as `user` and you're giving the user instructions of what
  to do. You pretty much chain everything from one command to the other unless
  you want to context switch to a new task.
  [learn more](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Subject-Management)

**Instruction**:

1.  Open `cypress/e2e/auth.register.todo.js` and run `npm run test:e2e`
2.  Run the tests `auth.register.todo.js`
3.  Implement the register test

**Exercise**:

1.  Open `cypress/e2e/auth.login.todo.js` and run `npm run test:e2e`
2.  Run the tests `auth.login.todo.js`
3.  Implement the login test

**Takeaways**:

* Once you've verified registration works in the UI, you should avoid needless
  test bottlenecks by using a utility to register a new user rather than
  registering a new user with the UI.
* E2E tests allow you to use your app like a user which gives you a LOT more
  confidence that things will work as expected when a user does use your app.
* Cypress has an AMAZING UX for writing E2E tests for web apps!

### Write tests. Not too many. Mostly integration.

See below in the shared content

---

## Shared Content

### What's a test

Before we get into all the testing frameworks, let's learn about what a test
even is. In your terminal, change directories to `other/whats-a-test` and open
the `0.js` file in your editor. Follow the instructions there and continue
through to `5.js`. You'll find the solutions in the associated `.solution`
files.

Learn more about this from:
["But really, what is a JavaScript test?"](https://blog.kentcdodds.com/46fe5f3fad77)

**New Things**:

* Assertion: A way for you to specify how things should be. Will throw an error if they are not that way, this is what fails the test.

**Takeaways**:

* Tests are simply code that runs other code and performs "assertions"
* Testing frameworks abstract this away for us to be more productive in writing tests.

### What types of testing are there?

Watch this 5 minute lightning talk:
["What we can learn about testing from the wheel"](https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

### Jest

**Instruction**:

1.  Open `other/jest-expect/__tests__/expect-assertions.js`
2.  Run `npm run test:expect`
3.  Walk through the different assertions (should be pretty quick)

**Exercise**:

> I don't think there's time/need for exercises here

**Takeaways**:

* Reference all the assertions here: https://facebook.github.io/jest/docs/en/expect.html

#### Code Coverage

Take a look at `other/coverage-example`. Look at the `example.js` file and
compare it to the `example.coverage.js` file. The one with coverage has been
instrumented with coverage meaning there's a variable set up for the file
and the code has been changed to include tracking of everywhere the code path
could go. Open up `coverage/lcov-report/index.html` in a browser to see the
report that this is intended to create.

**New Things**:

* Branch: A branch in the code path. For example: `if`, `else`, `ternary`, `switch`.
* Statement: A syntax expression intended to be executed: Function call and/or assignment
* Lines: [Basically irrelevant now](https://github.com/gotwarlost/istanbul/issues/639)
* Functions: Whether or not a function was ever invoked

**Takeaways**:

* Coverage is a useful metric as it shows you where code has not verifiably been
  run during tests.
* This metric is just an indicator and should not be misinterpreted as whether
  the logic is correct or the code will never break.
* You can get distracted by trying to achieve 100% code coverage when your time
  could be better spent elsewhere. Often trying to achieve 100% code coverage
  can result in doing weird things that make your tests brittle.

### Write tests. Not too many. Mostly integration.

Basically [this talk](https://slides.com/kentcdodds/write-tests).

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
