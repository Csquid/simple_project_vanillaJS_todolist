import * as read from './read.js'
import * as common from './common.js'

export function deleteLsTodoList(idx) {
  // Local Storage 에서 TodoLocalStorage 를 조회하여 기존에 있는 데이터를 가져온다.
  let   lsData            = read.loadLocalStorageTodoList();
  const tempTodoListDatas = common.clone(lsData);
  const tempIDX           = common.getListIDX(tempTodoListDatas.todolist, idx);

  console.log(tempIDX);
  debugger;
  const remove = tempTodoListDatas.todolist.splice(tempIDX, 1);

  console.log('remove', remove);
  console.log('tempTodoListDatas', tempTodoListDatas)

  localStorage.setItem(common.TodoLS, JSON.stringify(tempTodoListDatas));
  document.querySelector(`[data-id="${idx}"]`).remove();
}