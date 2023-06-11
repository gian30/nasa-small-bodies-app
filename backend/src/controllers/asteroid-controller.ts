import { Delete, Get, HttpCode, JsonController, Param, Post, QueryParams } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AsteroidService } from '../services/asteroid-service';

@Service()
@JsonController('/api/asteroids')
export class AsteroidController {
	constructor(@Inject() private asteroidService: AsteroidService) { }

	@Get('/')
	async getAsteroids(@QueryParams() params: { startDate?: string; endDate?: string }) {
		const { startDate, endDate } = params;
		const asteroids =
			startDate && endDate
				? await this.asteroidService.getAsteroidsByDate(startDate || '', endDate || '')
				: await this.asteroidService.getAsteroids();
		return asteroids;
	}

	@Post('/favorites/:asteroidId')
	@HttpCode(201)
	async addToFavorites(@Param('asteroidId') asteroidId: string) {
		await this.asteroidService.addFavoriteAsteroid(asteroidId);
		return {};
	}

	@Delete('/favorites/:asteroidId')
	@HttpCode(204)
	async removeFromFavorites(@Param('asteroidId') asteroidId: string) {
		await this.asteroidService.removeFavoriteAsteroid(asteroidId);
		return {};
	}
}
