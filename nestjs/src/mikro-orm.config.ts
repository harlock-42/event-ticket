import { Options } from "@mikro-orm/postgresql";
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const config: Options = {
	// host: process.env.POSTGRES_HOST,
	// user: process.env.POSTGRES_USER,
	// password: process.env.POSTGRES_PASSWORD,
	// dbName: process.env.POSTGRES_DB,
	dbName: 'event-ticket-db',
    host: 'postgres',
    password: '1234',
    user: 'postgres',
	type: 'postgresql',
	entities: ['./dist/**/*.entity.js'],
	entitiesTs: ['./src/**/*.entity.ts'],
	debug: true
}

export default config