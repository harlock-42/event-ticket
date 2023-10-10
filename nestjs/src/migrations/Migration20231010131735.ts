import { Migration } from '@mikro-orm/migrations';

export class Migration20231010131735 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_owner_id_foreign";');

    this.addSql('alter table "ticket" alter column "owner_id" type varchar(255) using ("owner_id"::varchar(255));');
    this.addSql('alter table "ticket" alter column "owner_id" drop not null;');
    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_owner_id_foreign";');

    this.addSql('alter table "ticket" alter column "owner_id" type varchar(255) using ("owner_id"::varchar(255));');
    this.addSql('alter table "ticket" alter column "owner_id" set not null;');
    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

}
