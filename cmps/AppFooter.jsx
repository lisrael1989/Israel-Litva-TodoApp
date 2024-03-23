const { useState, useEffect } = React;

import { UserMsg } from "./UserMsg.jsx";
const { useSelector } = ReactRedux;

export function AppFooter() {
  // const dispatch = useDispatch();
  const todosLength = useSelector((storeState) => storeState.todos.length);

  return (
    <footer className="app-footer">
      {/* <h5>Currently {todosLength} todos in the shop</h5> */}
      <h4 className="copy-rights">copyrights israel litvak</h4>
      <UserMsg />
    </footer>
  );
}
