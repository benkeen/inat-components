import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';

export default {
	input: 'src/index.js',
	output: [{
		file: pkg.main,
		format: 'cjs',
		sourcemap: true,
		named: true
	}, {
		file: pkg.module,
		format: 'es',
		sourcemap: true,
		named: true
	}],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		postcss({ modules: true })
	]
};