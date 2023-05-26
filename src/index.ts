/**
 * Copyright (c) 2022 Amorphous
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

type ObjectMeta = {
	classes?: string[]
	id?: string
	primary?: string
}

const separateAtShorthand = (string: string): ObjectMeta => {
	if (!string.startsWith("@")) {
		throw new Error("@ shorthand must begin with an @ symbol")
	}
	const stringWithoutPrefix = string.slice(1)
	const divElements = stringWithoutPrefix.split(".")

	const div: ObjectMeta = {
		classes: [],
	}

	for (let str of divElements) {
		if (str.startsWith("#")) {
			div.id = str.slice(1)

			continue
		}

		if (!div.classes) {
			div.classes = []
		}
		div.classes.push(str)
	}

	if (div.id) {
		div.primary = div.id
	} else if (div.classes && div.classes.length) {
		div.primary = div.classes[0]
	}

	return div
}

type AtShorthandLine = ObjectMeta & {
	text: string
}

export const parseAtShorthandLine = (line: string): AtShorthandLine => {
	if (!line.startsWith("@")) {
		return { text: line }
	}
	const tokens = line.split(" ")
	let atShorthand = tokens.shift() as string

	if (atShorthand.endsWith(":")) {
		atShorthand = atShorthand.substring(0, atShorthand.length - 1)
	}

	const objMeta = separateAtShorthand(atShorthand)

	const result = {
		...objMeta,
		text: tokens.join(" ").trim(),
	}

	return result
}
