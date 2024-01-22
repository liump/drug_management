import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div >
      <h1 className="mt-[20vh] flex justify-center">Oops!</h1>
      <p className="mt-24 flex justify-center">Sorry, an unexpected error has occurred.</p>
      <p className="mt-24 flex justify-center">
        <i>未找到页面</i>
      </p>
    </div>
  );
}