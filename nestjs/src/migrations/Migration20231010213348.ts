import { Migration } from '@mikro-orm/migrations';

export class Migration20231010213348 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "event" add constraint "event_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "event" drop constraint "event_name_unique";');
  }

}
