import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import postcss from '@bung87/rollup-plugin-postcss'
import sprites from '@bung87/postcss-sprites';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json'
export default [

	// browser-friendly UMD build
	{
		input: 'src/bundle.js',
		output: {
			name: 'L.<%= baseClass != "none" ? baseClass + "." : ""%><%= mainClass%>',
			globals: {
				'leaflet': 'L'
			},
			file: pkg.browser,
			format: 'umd'
		},
		external: ['leaflet'],
		plugins: [
			json(),
			postcss({
				extract: "dist/style.css",
				plugins: [sprites({
					stylesheetPath: './dist',
					spritePath: './dist/images/',
					retina: true,
					groups: ["2x"],
					ratio: 2
				})]
			}),
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				"presets": [
					["@babel/preset-env"]
				],
			})
		]
	},
	{
		input: 'src/index.js',
		external: ['leaflet'],
		plugins: [
			json(),
			postcss({

			}),
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				"presets": [
					[
						"@babel/preset-env",
						{
							"targets": {
								"node": true
							}
						}
					]
				]
			})

		],
		output: [
			{ file: pkg.main, format: 'cjs' },
		]
	},
	{
		input: 'src/index.js',
		external: ['leaflet'],
		plugins: [
			json(),
			postcss({

			}),
			resolve(), 
			commonjs(),
			babel({
				exclude: "node_modules/**",
				"presets": [
					[
						"@babel/preset-env",
						{
							"targets": {
								"esmodules": true
							}
						}
					]
				]
			})

		],
		output: [
			{ file: pkg.module, format: 'es' }
		]
	}
];