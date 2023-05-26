import * as esbuild from "esbuild"
import minimist from "minimist"
import npmDTS from 'npm-dts';
import pkg from "./package.json" assert { type: "json" }

const { Generator } = npmDTS;
const argv = minimist(process.argv.slice(2))

const shouldWatch = argv.w ? true : false

const baseOptions = {
	entryPoints: [`src/index.ts`],
	sourcemap: true,
	bundle: true,
	metafile: true,
	plugins: [],
}

const esmOptions = {
	...baseOptions,
	format: "esm",
	target: ["esnext"],
	outfile: pkg.main
}

async function build() {
	new Generator({
		// relative to tsconfig rootdir
		entry: 'index.ts',
		output: 'dist/index.d.ts',
	}).generate()
	
	if (shouldWatch) {
		let esmContext = await esbuild.context(esmOptions)
		await esmContext.watch()
		return
	}

	await esbuild.build(esmOptions)
}

build()
