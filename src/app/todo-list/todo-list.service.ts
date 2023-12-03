import { Injectable } from '@angular/core';

// Class
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor() {}

  private lists: Todo[] = [];

  /**
   * 新增待辦事項
   *
   * @param title - 待辦事項的標題
   */
  add(title: string): void {
    if (title || title.trim()) {
      this.lists.push(new Todo(title));
    }
  }

  /**
   * 取得待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListService
   */
  getlist(): Todo[] {
    return this.lists;
  }

  /**
   * 移除待辦事項
   *
   * @param {number} index - 待辦事項的索引位置
   * @memberof TodoListService
   */
  remove(index: number): void {
    this.lists.splice(index, 1);
  }

  /**
   * 取得已完成/未完成的清單
   *
   * @param {boolean} completed - 要取得已完成還是未完成的清單
   * @returns {Todo[]}
   * @memberof TodoListService
   */
  getWithCompleted(completed: boolean): Todo[] {
    return this.lists.filter((todo) => todo.done === completed);
  }

  /**
   * 從清單中移除所有已完成之待辦事項
   *
   * @memberof TodoListService
   */
  removeCompleted(): void {
    this.lists = this.getWithCompleted(false);
  }
}
