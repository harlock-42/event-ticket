import { Migration } from '@mikro-orm/migrations';

export class Migration20231005171853 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "base" drop constraint "base_pkey";');
    this.addSql('alter table "base" add constraint "base_pkey" primary key ("id", "created_at", "updated_at");');

    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id", "created_at", "updated_at", "username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "base" drop constraint "base_pkey";');
    this.addSql('alter table "base" add constraint "base_pkey" primary key ("id");');

    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
