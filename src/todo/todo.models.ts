import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

export class Todo {
  constructor(
    public id: string,
    public task: string,
    public description: string,
  ) {}
}
