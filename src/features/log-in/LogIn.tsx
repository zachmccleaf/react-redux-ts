import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logIn, logOut, selectLoggedIn } from "./logInSlice";

export function LogIn() {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const dispatch = useAppDispatch();

    const authMessage = isLoggedIn ? 'You are logged in.' : 'You are logged out.'

  return (
    <div>
        {authMessage}
        <button onClick={() => dispatch(logIn())}>
            Log In
        </button>
        <button onClick={() => dispatch(logOut())}>
            Log Out
        </button>
    </div>
  );
}
