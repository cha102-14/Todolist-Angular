import { Component, Input, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  newTodo: string = '';
  ngOnInit() {}
  constructor(private todoListService: TodoListService) {}

  /**
   * 待辦事項狀態的列舉
   *
   * @memberof TodoListComponent
   */
  todoStatusType = TodoStatusType;

  /**
   * 目前狀態
   *
   * @private
   * @memberof TodoListComponent
   */
  private status = TodoStatusType.All;

  /**
   * 新增代辦事項
   * @param inputEl 輸入的代辦事項
   */
  addTodo(): void {
    // console.log(this.newTodo);
    const todo = this.newTodo;

    if (todo) {
      this.todoListService.add(todo);
      this.newTodo = '';
    }
  }

  /**
   * 取得待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getlist(): Todo[] {
    let list: Todo[] = [];

    switch (this.status) {
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;

      case TodoStatusType.Completed:
        list = this.getCompltedList();
        break;

      default:
        list = this.todoListService.getlist();
        break;
    }

    return list;
  }

  /**
   * 移除待辦事項
   *
   * @param {number} index - 待辦事項的索引位置
   * @memberof TodoListComponent
   */
  remove(index: number): void {
    this.todoListService.remove(index);
  }

  /**
   * 開始編輯待辦事項
   *
   * @param {Todo} todo
   * @memberof TodoListComponent
   */
  edit(todo: Todo): void {
    todo.editable = true;
  }
  /**
   * 更新待辦事項
   *
   * @param {Todo} todo - 原本的待辦事項
   * @param {string} newTitle - 新的事項名稱
   * @memberof TodoListComponent
   */
  update(todo: Todo, newTitle: string): void {
    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();
    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      // 如果沒有名稱則刪除該項待辦事項
      const index = this.getlist().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  /**
   * 取消編輯狀態
   *
   * @param {Todo} todo - 欲取消編輯狀態的待辦事項
   * @memberof TodoListComponent
   */
  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  /**
   * 取得未完成的待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  /**
   * 取得已完成的待辦事項
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getCompltedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }

  /**
   * 設定狀態
   *
   * @param {number} status - 欲設定的狀態
   * @memberof TodoListComponent
   */
  setStatus(status: number): void {
    this.status = status;
  }

  /**
   * 檢查目前狀態
   *
   * @param {number} status - 欲檢查的狀態
   * @returns {boolean}
   * @memberof TodoListComponent
   */
  checkStatus(status: number): boolean {
    return this.status == status;
  }

  /**
   * 從清單中移除所有已完成之待辦事項
   *
   * @memberof TodoListComponent
   */
  removeComplted(): void {
    this.todoListService.removeCompleted();
  }

  /**
   * 取得所有的待辦事項清單（不受狀態影響）
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getAllList(): Todo[] {
    return this.todoListService.getlist();
  }

  /**
   * 所有的代辦事項是否都已完成
   *
   * @returns {boolean}
   * @memberof TodoListComponent
   */
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompltedList().length;
  }

  /**
   * 設定所有的待辦事項已完成/未完成
   *
   * @param {boolean} completed - 已完成/未完成
   * @memberof TodoListComponent
   */
  setAllTo(completed: boolean): void {
    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  }
}
