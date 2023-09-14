import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  addTodo(
    @Body('task') todoTask: string,
    @Body('description') todoDesc: string,
  ): any {
    const generatedId = this.todoService.insertTodo(todoTask, todoDesc);
    return { id: generatedId };
  }

  @Get()
  getAllTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') todoId: string) {
    return this.todoService.getSingleTodo(todoId);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') todoId: string,
    @Body('title') prodTask: string,
    @Body('description') prodDesc: string,
  ) {
    this.todoService.updateTodo(todoId, prodTask, prodDesc);
    return null;
  }

  @Delete(':id')
  deleteTodoById(@Param('id') todoId: string) {
    this.todoService.deleteTodo(todoId);
    return null;
  }
}
