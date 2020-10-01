import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Todo } from '../model/entities/todo.entity';
import { TodoCrudService } from '../services/todo.crud.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Crud({
  model: {
    type: Todo,
  },
})
@CrudType(Todo)
@UseGuards(AuthGuard())
@ApiBearerAuth()
@CrudAuth({
  property: 'user',
  // filter to apply in database query
  filter: user => ({
    userId: user.id,
  })
  //   persist: user=> ({
  //     userId: user.id
  //   })
})
@Controller('todo/todos')
export class TodoCrudController {
  constructor(public service: TodoCrudService) { }
}
