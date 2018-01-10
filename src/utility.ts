export function shouldNever (v: never) {
  throw new Error("Should never happen!")
}
