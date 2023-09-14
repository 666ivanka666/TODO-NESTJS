import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  insertTodo(task: string, description: string): string {
    const todoId = uuidv4();
    const newTodo = new Todo(todoId, task, description);
    this.todos.push(newTodo);
    return todoId;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getSingleTodo(todoId: string): Todo {
    const [todo] = this.findTodo(todoId);
    return { ...todo };
  }

  updateTodo(todoId: string, task: string, desc: string): void {
    const [todo, index] = this.findTodo(todoId);
    const updatedTodo = { ...todo };

    if (task) {
      updatedTodo.task = task;
    }
    if (desc) {
      updatedTodo.description = desc;
    }

    this.todos[index] = updatedTodo;
  }

  deleteTodo(todoId: string): void {
    const [_, index] = this.findTodo(todoId);
    this.todos.splice(index, 1);
  }

  private findTodo(id: string): [Todo, number] {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    const todo = this.todos[todoIndex];
    if (!todo) {
      throw new NotFoundException(`Could not find todo`);
    }
    return [todo, todoIndex];
  }
}
