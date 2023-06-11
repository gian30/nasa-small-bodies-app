import * as bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import { createExpressServer, useContainer as routingControllersUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { AsteroidController } from './controllers/asteroid-controller';
import { SERVER_PORT, WHITELIST_URLS } from './utils/constants';

class Server {
	private app: any;

	constructor() {
		// Create an instance of the Express server
		this.app = createExpressServer({
			controllers: [AsteroidController], // Set up the controllers
			cors: this.getCorsOptions(), // Configure CORS options
			middlewares: [bodyParser.urlencoded({ extended: false }), bodyParser.json()], // Set up the middlewares
		});
	}
	
	private getCorsOptions(): cors.CorsOptions {
		// Define CORS options
		return {
			origin: function (origin, callback) {
				if (WHITELIST_URLS.indexOf(origin) !== -1 || !origin) {
					// Allow requests from whitelisted URLs or from no origin (e.g., local requests)
					callback(null, true);
				} else {
					// Reject requests from non-whitelisted URLs
					callback(new Error('Not allowed by CORS'));
				}
			},
		};
	}

	public start(): void {
		// Set up dependency injection container
		routingControllersUseContainer(Container);

		// Start the server
		this.app.listen(SERVER_PORT, () => {
			console.log(`Server is running on port ${SERVER_PORT}`);
		});

		// Handle unhandledRejection errors
		process.on('unhandledRejection', (error: any, promise) => {
			console.error('Server', 'unhandledRejectionError:', `${error}`);
		});
	}
}

const server = new Server();
server.start();
