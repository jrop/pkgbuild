#!/usr/bin/env node
import chalk from 'chalk'
import minimist from 'minimist'
import {spawn} from 'child_process'
import rl from 'readline'

const COLORS   = ['blue', 'magenta', 'cyan', 'yellow', 'gray', 'green', 'white']
const RE       = () => /^pkg:\/\/(.*)$/
const RE_WATCH = () => /^pkg\*:\/\/(.*)$/
const RE_ANY   = () => /^pkg\*?:\/\/(.*)$/

let currColor = -1

function run(variant) {
	const variantName = RE_ANY().exec(variant)[1]
	const color = chalk[COLORS[(currColor = ++currColor % COLORS.length)]]
	const proc = spawn('npm', ['run', variant], {cwd: process.cwd()})
	function track(stream, tag) {
		const lines = rl.createInterface({input: stream})
		lines.on('line', l => console.log(
			color(`(${variantName}${tag ? `:${chalk.red(tag)}` : ''})`),
			l.replace(/\r?\n$/m, '')))
	}
	track(proc.stdout)
	track(proc.stderr, 'err')
	proc.on('exit', code => {
		console.log(color(`(${variantName}:exit) - ${code}`))
		if (code != 0)
			process.exitCode = 1
	})
}

function variants(regexp = RE()) {
	const pkg = require(`${process.cwd()}/package.json`)
	return Object.keys(pkg.scripts || {})
		.filter(script => {
			regexp.lastMatch = 0
			return regexp.test(script)
		})
}

function main() {
	const args = minimist(process.argv.slice(2))
	if (args.h || args.help)
		return console.log(require('./help').trim())
	if (args.v || args.version)
		return console.log('pkgbuild', require('../package.json').version)

	variants(args.w || args.watch ? RE_WATCH() : RE())
		.filter(v => args._.length > 0 ? args._.includes(v) : v)
		.forEach(v => run(v))
}

export {run, variants}
if (require.main == module)
	main()
