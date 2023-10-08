import { Options } from "@mikro-orm/postgresql";
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const config: Options = {
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	dbName: process.env.POSTGRES_DB,
	type: 'postgresql',
	entities: ['./dist/**/*.entity.js'],
	entitiesTs: ['./src/**/*.entity.ts'],
	debug: true
}

export default config