import { PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsDefined, IsOptional } from 'class-validator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsDefined({ groups: [CrudValidationGroups.UPDATE] })
  @IsOptional({ groups: [CrudValidationGroups.CREATE] })
  id!: number;

  @VersionColumn({ default: 1 })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  version!: number;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  createdAt!: string;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  updatedAt!: string;
}
