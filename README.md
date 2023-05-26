# at-shorthand

A format for metadata that decorates a single line of text. Can be converted into HTML classes and ids, which then are presented in JSON form.

## Usage

```js
import { parseAtShorthandLine } from '@a-morphous/at-shorthand'

const jsonLine = parseAtShorthandLine(string)
```

## Format

@ shorthand is separated from the rest of the text content by a space, or a colon and a space:

```
@metadata This is regular prose.
@metadata2: The colon is optional.
```

Like in HTML, these identifiers are called `classes`.

Different classes are separated by `.` in the @ shorthand.

```
@tag1.tag2 This text has two tags attached to it.
```

A class starting with `#` is instead rendered as an id:

```
@#id Ids have a special field in the parsed JSON, and are always set to the primary field of the JSON over classes.
@#id.class You can mix Ids and classes.
@class.#id or put them in any order.
```

A line can have any number of classes, but only one id.

## Output Format

```js
{
	classes: string[] // list of classes in order
	id: string // an id, if the line had one
	primary: string // the id if it exists, else the first class
	text: string // the rest of the line
}
```