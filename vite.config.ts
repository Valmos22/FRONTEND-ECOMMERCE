import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: parseInt(process.env.VITE_PORT || '5174'), // Si no está definida, usa el puerto 3000
	},
	preview: {
		host: '0.0.0.0',
		port: parseInt(process.env.VITE_PORT || '5174'), // Usa el mismo puerto para el modo de preview
	}
});