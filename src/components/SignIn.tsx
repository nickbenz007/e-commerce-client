import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../utils/Loader";

export const SignIn = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token", "user"]);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await dispatch(
      signInUser({ username: userName, password })
    );

    if (password.length < 8) {
      return error;
    }

    if (response.meta.requestStatus === "fulfilled") {
      const { token, user } = response.payload;

      setCookies("access_token", token);
      setCookies("user", JSON.stringify(user));
      navigate("/");
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col md:w-3/6 w-4/5 bg-gray-600 my-16 rounded-xl">
        <div className="flex w-full items-center justify-center py-4">
          <h1 className="text-gray-50 font-sans font-bold text-2xl tracking-wider">
            Sign In
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <form
            onSubmit={onSubmit}
            className="flex flex-col max-w-4xl justify-between items-center"
          >
            <div className="flex flex-col py-4">
              <label
                htmlFor="username"
                className="text-gray-50 text-sm font-sans font-semibold tracking-wider"
              >
                User Name
              </label>
              <input
                required
                type="text"
                value={userName}
                placeholder="Example: Nick Benz"
                onChange={(event) => setUserName(event.target.value)}
                className="px-3 py-2 rounded-lg text-sm text-gray-900 font-normal font-sans tracking-normal md:w-72 w-60"
              />
            </div>
            <div className="flex flex-col py-4 relative">
              <label
                htmlFor="password"
                className="text-gray-50 text-sm font-sans font-semibold tracking-wider"
              >
                Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password must be 6 Character long"
                onChange={(event) => setPassword(event.target.value)}
                className="px-3 py-2 rounded-lg text-sm text-gray-900 font-normal font-sans tracking-normal md:w-72 w-60"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePassVisibility}
                className="absolute bottom-6 right-3 cursor-pointer"
              />
            </div>
            {error && (
              <div className="flex w-full text-center items-center justify-center">
                <p className="text-gray-100 text-sm font-sans font-normal">
                  <span className="text-red-500 text-lg font-sans font-semibold">
                    Error:
                  </span>{" "}
                  {error}
                </p>
              </div>
            )}
            <div className="flex my-4">
              <button
                type="submit"
                className="px-4 py-1 rounded-lg bg-sky-500 border border-gray-100 hover:bg-sky-600 hover:text-gray-50 font-sans font-semibold transition delay-75 duration-75 hover:scale-110 ease-linear"
              >
                {isLoading ? <Loader /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
