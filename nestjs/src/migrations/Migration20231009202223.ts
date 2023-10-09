import { Migration } from '@mikro-orm/migrations';

export class Migration20231009202223 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "salt" type varchar(255) using ("salt"::varchar(255));');
    this.addSql('alter table "user" alter column "salt" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" alter column "salt" type varchar(255) using ("salt"::varchar(255));');
    this.addSql('alter table "user" alter column "salt" set not null;');
  }

}
