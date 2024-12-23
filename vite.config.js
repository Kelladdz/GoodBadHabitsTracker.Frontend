import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dns from 'dns';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react-swc'

dotenv.config();

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
	server: {
		port: 8080,
		https: {
			key: readFileSync(resolve('dev.pem')),
			cert: readFileSync(resolve('cert.pem'))
		},
		cors: {
			origin: process.env.VITE_LOCALHOST_URL,
			optionsSuccessStatus: 200,
		},
	},
	plugins: [mkcert()],


});