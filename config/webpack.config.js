const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const ROOT_DIRECTORY = path.join(__dirname, '../');
const PUBLIC_DIRECTORY = path.join(ROOT_DIRECTORY, 'public');

const config = {
	entry: [path.resolve(ROOT_DIRECTORY, 'src/index.js')],
	output: {
		path: path.resolve(ROOT_DIRECTORY, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	mode: 'development',
	resolve: {
		modules: [path.resolve('node_modules'), 'node_modules'],
		alias: {
			'path-to-regexp': path.resolve(
				ROOT_DIRECTORY,
				'node_modules',
				'react-router',
				'node_modules',
				'path-to-regexp'
			),
		},
	},
	performance: {
		hints: false,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(PUBLIC_DIRECTORY, 'index.html'),
		}),
		new Dotenv({ path: path.resolve(ROOT_DIRECTORY, './src/.env') }),
		new FaviconsWebpackPlugin(path.resolve(PUBLIC_DIRECTORY, 'logo.png')),
	],
	module: {
		// helpers we want webpack to use
		rules: [
			// specific instructions for each helper
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }, // transpile JavaScript files
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}, // transpile css files
			{
				test: /\.(png|svg|jpg|gif|pdf)$/,
				use: ['file-loader'],
			}, // transpile image files
		],
	},
};
module.exports = config;
