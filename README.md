# slugify

![preview](images/preview.svg)

Transliterate and slugify strings — Cyrillic, Latin, Unicode normalisation.

## Install

`ash
npm install @alexblack-dev/slugify
`

## Usage

`	s
import { slugify } from '@alexblack-dev/slugify'

slugify('Hello World')           // 'hello-world'
slugify('Привет, мир!')          // 'privet-mir'
slugify('Café Zürich')           // 'cafe-zurich'
slugify('  multi   space  ')     // 'multi-space'
slugify('___foo___bar___')       // 'foo-bar'
`

### Options

`	s
slugify('Hello World', { separator: '_' })          // 'hello_world'
slugify('Hello World', { lowercase: false })        // 'Hello-World'
slugify('Hello   World', { maxConsecutive: 1 })      // 'hello-world'
`

## API

### slugify(input, options?)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| separator | string | '-' | Separator between words |
| lowercase | boolean | true | Convert to lowercase |
| maxConsecutive | number | 1 | Max consecutive separators |

### 	ransliterate(input)

`	s
import { transliterate } from '@alexblack-dev/slugify'

transliterate('Привет')  // 'Privet'
transliterate('Čeština') // 'Cestina'
`

## License

MIT © [Alex Black](https://github.com/AlexBlack-Dev)