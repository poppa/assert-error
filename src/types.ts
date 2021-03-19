/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | undefined
export type ClassType<T = any> = new (...args: any[]) => T
export type AnyFunction = FunctionType<(...args: any[]) => any>
export type FunctionType<R extends (...args: any[]) => any> = (
  ...args: Parameters<R>
) => ReturnType<R>
