import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1601551431378 implements MigrationInterface {
    name = 'CreateTables1601551431378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "username" varchar(255) NOT NULL, "password" varchar(255) NOT NULL, "role" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar(22) NOT NULL, "priority" tinyint NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar(22) NOT NULL, "priority" tinyint NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL, CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todo"("id", "version", "createdAt", "updatedAt", "description", "priority", "completed", "userId") SELECT "id", "version", "createdAt", "updatedAt", "description", "priority", "completed", "userId" FROM "todo"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "version" integer NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar(22) NOT NULL, "priority" tinyint NOT NULL, "completed" boolean NOT NULL DEFAULT (0), "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "todo"("id", "version", "createdAt", "updatedAt", "description", "priority", "completed", "userId") SELECT "id", "version", "createdAt", "updatedAt", "description", "priority", "completed", "userId" FROM "temporary_todo"`);
        await queryRunner.query(`DROP TABLE "temporary_todo"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
