# slugify

![preview](images/preview.svg)

Transliterate and slugify strings â€” Cyrillic, Latin, Unicode normalisation.

## Install

`ash
npm install @alexblack-dev/slugify
`

## Usage

`s
import { slugify } from '@alexblack-dev/slugify'

slugify('Hello World')           // 'hello-world'
slugify('ÐŸÑ€Ð¸Ð²ÐµÑ‚, Ð¼Ð¸Ñ€!')          // 'privet-mir'
slugify('CafÃ© ZÃ¼rich')           // 'cafe-zurich'
slugify('  multi   space  ')     // 'multi-space'
slugify('___foo___bar___')       // 'foo-bar'
`

### Options

`s
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

### ransliterate(input)

`s
import { transliterate } from '@alexblack-dev/slugify'

transliterate('ÐŸÑ€Ð¸Ð²ÐµÑ‚')  // 'Privet'
transliterate('ÄŒeÅ¡tina') // 'Cestina'
`

## License

MIT Â© [Alex Black](https://github.com/AlexBlack-Dev)