// // Main web here

// // Some dummies for linting

// // @typescript-eslint/explicit-module-boundary-types - Missing return type on function
// function fetchData() {
//   return 'data'
// }

// // @typescript-eslint/no-explicit-any - Usage of `any` type
// const response: any = 'some response'

// // @typescript-eslint/no-inferrable-types - Type is inferred automatically; explicit annotation is redundant
// const count = 5

// // @typescript-eslint/no-non-null-assertion - Non-null assertion used
// const element = document.getElementById('myId')!

// // @typescript-eslint/no-unused-vars - Unused variable `data`
// const data = 'unused'

// // @typescript-eslint/no-empty-function - Empty function without body
// function doNothing() {}

// // @typescript-eslint/no-shadow - Variable `count` is shadowed in inner scope
// const countShadow = 1
// function increment() {
//   const countShadow = 2
//   console.log(countShadow)
// }

// // @typescript-eslint/no-misused-promises - Promise used as a boolean expression
// const isReady = new Promise((resolve) => resolve(true))
// if (isReady) {
//   console.log('Ready')
// }

// // @typescript-eslint/consistent-type-assertions - Type assertion style is not consistent
// const someValue = 'hello'
// const strLength = (someValue as unknown as number).length

// // @typescript-eslint/adjacent-overload-signatures - Overloads are not adjacent
// class Person {
//   speak(word: string): void
//   speak(): void {}
// }

// // @typescript-eslint/naming-convention - Interface without `I` prefix
// interface UserDetails {
//   name: string
// }

// // no-console - Usage of `console.log`
// console.log('Logging data...')

// // security/detect-non-literal-fs-filename - Non-literal filename in file system operation
// import fs from 'fs'
// fs.readFileSync(process.argv[2])

// // eqeqeq - Use of `==` instead of `===`
// if (count == 5) {
//   console.log('Count is 5')
// }

// // no-var - Usage of `var` instead of `let` or `const`
// const age = 25

// // prefer-const - Variable `username` is never reassigned, use `const` instead
// const username = 'admin'

// // no-else-return - Else is redundant after return statement
// function isValid(value: number) {
//   if (value > 0) return true

//   return false
// }

// // arrow-body-style - Arrow function should not have a block body
// const add = (a: number, b: number) => a + b

// // no-multiple-empty-lines - Multiple consecutive empty lines
// const x = 10

// const y = 20

// // padding-line-between-statements - Missing padding line between statements
// function calculateTotal(price: number) {
//   const tax = 0.1

//   return price + price * tax
// }
