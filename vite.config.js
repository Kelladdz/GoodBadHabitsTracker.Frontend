import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dns from 'dns';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
	server: {
		port: 8080,
		https: {
			key: readFileSync(resolve(process.env.VITE_DEV_PEM_LOCATION)),
			cert: readFileSync(resolve(process.env.VITE_CERT_PEM_LOCATION))
		},
		cors: {
			origin: process.env.VITE_LOCALHOST_URL,
			optionsSuccessStatus: 200,
		},
	},
	plugins: [mkcert()],

});