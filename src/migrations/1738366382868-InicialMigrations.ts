import { MigrationInterface, QueryRunner } from "typeorm";

export class InicialMigrations1738366382868 implements MigrationInterface {
    name = 'InicialMigrations1738366382868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "teacherId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_courses_course" ("studentId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_14a911a16ab76c78f1fe6368a92" PRIMARY KEY ("studentId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29e49d9ad51ffb927f488f0802" ON "student_courses_course" ("studentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d13666d470035a399961e1d08c" ON "student_courses_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_courses_course" ADD CONSTRAINT "FK_29e49d9ad51ffb927f488f0802e" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_courses_course" ADD CONSTRAINT "FK_d13666d470035a399961e1d08cb" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_courses_course" DROP CONSTRAINT "FK_d13666d470035a399961e1d08cb"`);
        await queryRunner.query(`ALTER TABLE "student_courses_course" DROP CONSTRAINT "FK_29e49d9ad51ffb927f488f0802e"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d13666d470035a399961e1d08c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29e49d9ad51ffb927f488f0802"`);
        await queryRunner.query(`DROP TABLE "student_courses_course"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
