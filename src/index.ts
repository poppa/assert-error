import type { ClassType, Maybe } from './types'
import { isFunction, isObject } from './helpers'

/**
 * Assert that `e` is an error of type `T`.
 */
export function assertError<
  T extends Error = Error,
  C extends Maybe<Error> = undefined
>(
  e: unknown,
  errorClass?: C extends undefined ? undefined : ClassType<C>
): asserts e is C extends undefined ? T : C {
  const checkClass = errorClass ?? Error

  if (
    (isObject(checkClass) || isFunction(checkClass)) &&
    !(e instanceof checkClass)
  ) {
    throw new Error(`Object e of type ${typeof e} is not an Error`)
  }
}
