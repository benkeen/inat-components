import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

export default {
	input: 'src/index.js',
	output: [{
		file: pkg.main,
		format: 'cjs',
		sourcemap: true
	}, {
		file: pkg.module,
		format: 'es',
		sourcemap: true
	}],
	external: [
		'axios',
		'debounce',
		'prop-types',
		'react',
		'react-select/async'
	],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		postcss({ modules: true })
	]
};