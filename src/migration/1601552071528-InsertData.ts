import { MigrationInterface, QueryRunner } from "typeorm";
import { roles } from '../app/core/auth/model/roles.enum';
import { User } from '../app/core/user/model/entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { Todo } from '../app/todo/model/entities/todo.entity';

export class InsertData1601552071528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.save(User, {
            id: 1,
            username: 'user',
            password: await hash('pass', await genSalt(12)),
            role: roles.USER,
        })
        queryRunner.manager.save(User, {
            id: 2,
            username: 'admin',
            password: await hash('admin', await genSalt(12)),
            role: roles.ADMIN,
        })
        queryRunner.manager.save(Todo, {
            description: 'Remember the milk!!',
            priority: 1,
            completed: false,
            userId: 1,
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "todo"');
        await queryRunner.query('DELETE FROM "user"');
    }

}
