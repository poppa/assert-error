import type { AnyFunction } from './types'

export function isFunction(f: unknown): f is AnyFunction {
  return f !== null && typeof f === 'function'
}

export function isObject(what: unknown): what is Record<string, unknown> {
  return (
    typeof what === 'object' &&
    what !== null &&
    !Array.isArray(what) &&
    !isFunction(what)
  )
}
