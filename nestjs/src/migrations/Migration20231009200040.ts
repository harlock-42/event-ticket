import { Migration } from '@mikro-orm/migrations';

export class Migration20231009200040 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" varchar(255) not null, add column "salt" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "password";');
    this.addSql('alter table "user" drop column "salt";');
  }

}
