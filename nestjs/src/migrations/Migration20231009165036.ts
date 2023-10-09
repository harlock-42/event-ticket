import { Migration } from '@mikro-orm/migrations';

export class Migration20231009165036 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "event" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "address" varchar(255) not null, "date_event" timestamptz(0) not null, "owner_id" varchar(255) not null, constraint "event_pkey" primary key ("id"));');

    this.addSql('create table "ticket" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "owner_id" varchar(255) not null, "event_id" varchar(255) not null, constraint "ticket_pkey" primary key ("id"));');

    this.addSql('alter table "event" add constraint "event_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "ticket" add constraint "ticket_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_event_id_foreign";');

    this.addSql('drop table if exists "event" cascade;');

    this.addSql('drop table if exists "ticket" cascade;');
  }

}
