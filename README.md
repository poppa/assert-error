# assert-error

When using strict errors in TS the type of the error in the `catch` clause
is `unknown`. This is a good thing since it forces you to properly handle the
error.

This package provides two functions to make this error handling easier.

## Install

The usual `npm install @poppanator/assert-error`,
`yarn add @poppanator/assert-error`, etc...

## Example

Ponder the following

```ts
try {
  // Do some funky salsa
} catch (err: unknown) {
  console.error('Error message:', err.message)
  // .................................^^^^^^^
  // It's a nono
}
```

Since TS doesn't know wether `err` is an error object or not you can't index
on it.

But using `assertError()` you can:

```ts
import { assertError } from '@poppanator/assert-error'

try {
  // Do some funky chimichurri
} catch (err: unknown) {
  assertError(err)
  console.error('Error message:', err.message)
  // It's a Yay-Yay
}
```

Now TS known ist's an Error object and indexing on it is fine.
If `err` is not an instance of (at least) `Error`, `assertError()` will throw.

To assert `err` is some other error than `Error`, you can provide the class
constructor as second argument to `assertError()`:

```ts
class MyError extends Error {
  public code = 12
}

try {
  // Do some funky pesto
} catch (err: unknown) {
  assertError(err, MyError)
  console.error('Error:', err.code)
}
```

Now, you may not always want something to throw in you `catch` clause. If
that's the case you can use `assumeError()`, which is just a typeguard working
in the same way as `assertError()`.

`assertError()` is to prefer over `assumeError()`, but there might be situations
where you just want to type-guard and not risking ending up with something
throwing an error.

**NOTE!** `assumeError()` has no runtime-effect. It does nothing.

```ts
import { assumeError } from '@poppanator/assert-error'

try {
  // Do some funky gaspacho
} catch (err: unknown) {
  assumeError(err)
  console.error('Error:', err.message)

  // These two are the same thing
  assumeError<MyError>(err)
  assumeError(err, MyError)

  if (err.code) {
    console.error('Error code:', err.code)
  }
}
```
