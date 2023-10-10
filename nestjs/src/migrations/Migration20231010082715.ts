import { Migration } from '@mikro-orm/migrations';

export class Migration20231010082715 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_username_unique";');
  }

}
