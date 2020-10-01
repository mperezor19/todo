import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { User } from '../../../core/user/model/entities/user.entity';
import { IsDefined, IsOptional, IsString, MaxLength, IsInt, Max, Min, IsBoolean } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Todo extends BaseEntity {
    @Column('varchar', { length: 255, nullable: false })
    @IsDefined({ groups: [CrudValidationGroups.CREATE] })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsString()
    @MaxLength(255)
    description!: string;

    @Column('tinyint', { nullable: false })
    @IsDefined({ groups: [CrudValidationGroups.CREATE] })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty({ type: 'number' })
    priority!: number;

    @Column('boolean', { nullable: false, default: false })
    @IsDefined({ groups: [CrudValidationGroups.CREATE] })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsBoolean({ groups: [CrudValidationGroups.UPDATE] })
    completed!: boolean;

    @Column('bigint', { nullable: false })
    @ApiHideProperty()
    userId!: number;

    @ManyToOne(
        () => User,
        user => user.id,
    )
    @JoinColumn()
    @ApiHideProperty()
    user?: User;
}
