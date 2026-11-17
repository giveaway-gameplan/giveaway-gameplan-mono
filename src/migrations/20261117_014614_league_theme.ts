import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leagues" ADD COLUMN "theme_light_accent" varchar;
  ALTER TABLE "leagues" ADD COLUMN "theme_light_background" varchar;
  ALTER TABLE "leagues" ADD COLUMN "theme_dark_accent" varchar;
  ALTER TABLE "leagues" ADD COLUMN "theme_dark_background" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leagues" DROP COLUMN "theme_light_accent";
  ALTER TABLE "leagues" DROP COLUMN "theme_light_background";
  ALTER TABLE "leagues" DROP COLUMN "theme_dark_accent";
  ALTER TABLE "leagues" DROP COLUMN "theme_dark_background";`)
}
