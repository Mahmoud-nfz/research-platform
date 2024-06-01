import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	define: {
		'process.env.VITE_ENABLE_MT':
			process.env.VITE_ENABLE_MT === '1' ? '1' : '0',
	},
	build: {
		// your build configuration here
	},
	plugins: [
		react({
			babel: {
				plugins: [
					[
						'@babel/plugin-transform-runtime',
						{
							helpers: true,
							regenerator: true,
							useESModules: false,
						},
					],
				],
			},
		}),
	],
}));
