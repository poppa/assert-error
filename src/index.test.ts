import 'jest'
import { assertError, assumeError } from '.'

class TestError extends Error {
  public isTest = true
}

test('assertError() should throw if error is not an Error', () => {
  expect(() => assertError('no')).toThrow()
})

test(
  'assertError() should throw if error is not an instance' +
    ' of expected type',
  () => {
    const err = new Error('Test')
    expect(() => assertError(err, TestError)).toThrow()
  }
)

test(
  'assertError() without `errorClass` argument should not' +
    ' throw if `error` is an instance of any Error',
  () => {
    const err = new Error('Test')
    expect(() => assertError(err)).not.toThrow()
  }
)

test(
  'assertError() with `errorClass` argument should not throw ' +
    ' if `error` is an instance of that class',
  () => {
    const err = new TestError('Test')
    expect(() => assertError(err, TestError)).not.toThrow()
  }
)

test('assertError() should not throw if `error` extends `Error`', () => {
  const err = new TestError('Test')
  expect(() => assertError(err)).not.toThrow()
})

test('assumeError() without `errorClass` should give correct type inference', () => {
  try {
    throw new Error('test')
  } catch (err: unknown) {
    assumeError(err)
    expect(err.message).toEqual('test')
  }
})

test(
  'assumeError() without `errorClass` but with type argument' +
    ' should give correct type inference',
  () => {
    try {
      throw new Error('test')
    } catch (err: unknown) {
      assumeError<TestError>(err)
      expect(err.isTest).toBeUndefined()
    }
  }
)

test('assumeError() with `errorClass` should give correct type inference', () => {
  try {
    throw new Error('test')
  } catch (err: unknown) {
    assumeError(err, TestError)
    expect(err.isTest).toBeUndefined()
  }
})
