export interface SlugifyOptions {
  separator?: string
  lowercase?: boolean
  maxConsecutive?: number
}

const DEFAULT_SEPARATOR = '-'

const MAP: [RegExp, string][] = [
  [/[ÀÁÂÃÄÅĀĂ]/g, 'A'],
  [/[àáâãäåāă]/g, 'a'],
  [/[ÈÉÊËĒĔ]/g, 'E'],
  [/[èéêëēĕ]/g, 'e'],
  [/[ÌÍÎÏĨ]/g, 'I'],
  [/[ìíîïĩ]/g, 'i'],
  [/[ÒÓÔÕÖŌ]/g, 'O'],
  [/[òóôõöō]/g, 'o'],
  [/[ÙÚÛÜŨ]/g, 'U'],
  [/[ùúûüũ]/g, 'u'],
  [/[ÝŸ]/g, 'Y'],
  [/[ýÿ]/g, 'y'],
  [/[ÑŅ]/g, 'N'],
  [/[ñņ]/g, 'n'],
  [/[ÇĆĈĊČ]/g, 'C'],
  [/[çćĉċč]/g, 'c'],
  [/[ĞĠ]/g, 'G'],
  [/[ğġ]/g, 'g'],
  [/[ŠŚŜŞ]/g, 'S'],
  [/[šśŝş]/g, 's'],
  [/[ŽŹŻ]/g, 'Z'],
  [/[žźż]/g, 'z'],
  [/[ĻĽ]/g, 'L'],
  [/[ļľ]/g, 'l'],
  [/[ŘŔ]/g, 'R'],
  [/[řŕ]/g, 'r'],
  [/[ĎĐ]/g, 'D'],
  [/[ďđ]/g, 'd'],
  [/[ŤŢ]/g, 'T'],
  [/[ťţ]/g, 't'],
  [/[Ů]/g, 'U'],
  [/[ů]/g, 'u'],
  [/[Æ]/g, 'AE'],
  [/[æ]/g, 'ae'],
  [/[Œ]/g, 'OE'],
  [/[œ]/g, 'oe'],
  [/[Ð]/g, 'D'],
  [/[ð]/g, 'd'],
  [/[Þ]/g, 'TH'],
  [/[þ]/g, 'th'],
  [/[ß]/g, 'ss'],
  // Cyrillic
  [/[А]/g, 'A'], [/[а]/g, 'a'],
  [/[Б]/g, 'B'], [/[б]/g, 'b'],
  [/[В]/g, 'V'], [/[в]/g, 'v'],
  [/[Г]/g, 'G'], [/[г]/g, 'g'],
  [/[Д]/g, 'D'], [/[д]/g, 'd'],
  [/[ЕЁ]/g, 'E'], [/[её]/g, 'e'],
  [/[Ж]/g, 'Zh'], [/[ж]/g, 'zh'],
  [/[З]/g, 'Z'], [/[з]/g, 'z'],
  [/[И]/g, 'I'], [/[и]/g, 'i'],
  [/[Й]/g, 'Y'], [/[й]/g, 'y'],
  [/[К]/g, 'K'], [/[к]/g, 'k'],
  [/[Л]/g, 'L'], [/[л]/g, 'l'],
  [/[М]/g, 'M'], [/[м]/g, 'm'],
  [/[Н]/g, 'N'], [/[н]/g, 'n'],
  [/[О]/g, 'O'], [/[о]/g, 'o'],
  [/[П]/g, 'P'], [/[п]/g, 'p'],
  [/[Р]/g, 'R'], [/[р]/g, 'r'],
  [/[С]/g, 'S'], [/[с]/g, 's'],
  [/[Т]/g, 'T'], [/[т]/g, 't'],
  [/[У]/g, 'U'], [/[у]/g, 'u'],
  [/[Ф]/g, 'F'], [/[ф]/g, 'f'],
  [/[Х]/g, 'Kh'], [/[х]/g, 'kh'],
  [/[Ц]/g, 'Ts'], [/[ц]/g, 'ts'],
  [/[Ч]/g, 'Ch'], [/[ч]/g, 'ch'],
  [/[Ш]/g, 'Sh'], [/[ш]/g, 'sh'],
  [/[Щ]/g, 'Shch'], [/[щ]/g, 'shch'],
  [/[ЪЬ]/g, ''], [/[ъь]/g, ''],
  [/[Ы]/g, 'Y'], [/[ы]/g, 'y'],
  [/[Э]/g, 'E'], [/[э]/g, 'e'],
  [/[Ю]/g, 'Yu'], [/[ю]/g, 'yu'],
  [/[Я]/g, 'Ya'], [/[я]/g, 'ya'],
]

export function transliterate(input: string): string {
  let result = input
  for (const [pattern, replacement] of MAP) {
    result = result.replace(pattern, replacement)
  }
  return result
}

export function slugify(
  input: string,
  options?: SlugifyOptions,
): string {
  const {
    separator = DEFAULT_SEPARATOR,
    lowercase = true,
    maxConsecutive = 1,
  } = options ?? {}

  let result = transliterate(input)

  result = result.replace(/[^\w\s-]/g, '')
  result = result.replace(/[\s]+/g, separator)
  result = result.replace(/[_]+/g, separator)

  if (maxConsecutive > 0) {
    const pattern = new RegExp(
      `${escapeRe(separator)}{${maxConsecutive + 1},}`,
      'g',
    )
    result = result.replace(pattern, separator)
  }

  result = result.replace(
    new RegExp(`^${escapeRe(separator)}+|${escapeRe(separator)}+$`, 'g'),
    '',
  )

  if (lowercase) {
    result = result.toLowerCase()
  }

  return result
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
