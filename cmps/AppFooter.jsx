const { useState, useEffect } = React;

import { UserMsg } from "./UserMsg.jsx";
const { useSelector } = ReactRedux;

export function AppFooter() {
  // const dispatch = useDispatch();
  // const todosLength = useSelector((storeState) => storeState.todos.length);

  return (
    <footer className="app-footer">
      {/* <h5>Currently {todosLength} cars in the shop</h5> */}
      <h1>test</h1>
      <UserMsg />
    </footer>
  );
}
