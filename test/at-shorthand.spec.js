import { parseAtShorthandLine } from "../dist/index.js";
import fs from 'fs';
import path from "path";
import { expect } from "expect"
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const testCases = fs.readFileSync(path.resolve(__dirname, 'cases.stage'), 'utf-8')
const testCaseLines = testCases.split('\n')

const expectedResults = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cases-results.json'), 'utf-8'))
for (let i = 0; i < testCaseLines.length; i++) {
	const line = testCaseLines[i]
	const results = parseAtShorthandLine(line)
	expect(results).toStrictEqual(expectedResults[i])
	console.log(`Test Case ${i} passed.`)
}