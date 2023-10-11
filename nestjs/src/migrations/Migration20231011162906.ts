import { Migration } from '@mikro-orm/migrations';

export class Migration20231011162906 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_owner_id_foreign";');

    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ticket" drop constraint "ticket_owner_id_foreign";');

    this.addSql('alter table "ticket" add constraint "ticket_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');
  }

}
