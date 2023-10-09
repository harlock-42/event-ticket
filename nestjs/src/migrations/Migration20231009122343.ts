import { Migration } from '@mikro-orm/migrations';

export class Migration20231009122343 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "base" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "base_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "base" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
