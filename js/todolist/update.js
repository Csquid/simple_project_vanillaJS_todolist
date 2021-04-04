import * as read from './read.js'
import * as common from './common.js'
 // checkbox를 클릭했을경우 Local Storage를 조회하여 해당 id값에 check를 부분에 true 또는 false 를 넣어준다.
export function updateLSCheck(idx) {
  // Local Storage 에서 TodoLocalStorage 를 조회하여 기존에 있는 데이터를 가져온다.
  let   lsData            = read.loadLocalStorageTodoList();
  const tempTodoListDatas = common.clone(lsData);
  const tempIDX           = common.getListIDX(tempTodoListDatas.todolist, idx);

  if(tempTodoListDatas.todolist[tempIDX].check) {
    tempTodoListDatas.todolist[tempIDX].check = false;
  } else {
    tempTodoListDatas.todolist[tempIDX].check = true;
  }

  localStorage.setItem(common.TodoLS, JSON.stringify(tempTodoListDatas));
  // debugger;
}
