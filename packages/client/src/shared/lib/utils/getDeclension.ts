export function getDeclension(number: number, words: string[]) {
  const isFraction = !Number.isInteger(number)

  if (isFraction) {
    return words[2] // Род. падеж множественного числа для дробей
  }

  const n = Math.abs(number)
  return words[
    n % 100 > 4 && n % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][n % 10 < 5 ? n % 10 : 5]
  ]
}
