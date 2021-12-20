import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1639971419470 implements MigrationInterface {
    name = 'migration1639971419470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "active_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "userId" text NOT NULL, "date" date NOT NULL DEFAULT now(), CONSTRAINT "PK_f14ab8ee60757c7fdd3bae02318" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "status" boolean NOT NULL, "confirmacao_registro" boolean NOT NULL, "confirmacao_token" text NOT NULL, "user_token" text NOT NULL, "key" text NOT NULL, "host" text NOT NULL, "date" date NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "active_session"`);
    }

}
