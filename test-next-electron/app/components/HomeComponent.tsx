import { useState } from "react";
import useTodos from "../hooks/todos";
import useUsers from "../hooks/users";
import Todo from "./Todo";

interface HomeProps {
  prop: string;
}

const HomeComponent = (props: HomeProps) => {
  const { prop } = props;

  
  const [todoId, setTodoId] = useState(0)
  const [userId, setUserId] = useState(0)

  const { todo, todoErr, todoIsLoading, todos, todosErr, todosIsLoading } = useTodos({ todoId });
  const { user, users } = useUsers({ userId });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This is only a MERE example to test Next.js + Electron
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            cause I{"'"}m a bitch and I need to test thing like these for my client{" "}
          </p>
        </div>
        <div className="flex w-full gap-4 justify-around text-xs font-medium">
          <Todo todoId={todoId} todo={todo} setTodoId={setTodoId} isLoading={todoIsLoading} />
        </div>
        <div className="flex w-full gap-4 justify-around text-lg font-medium">
          I wanted to do the same as above for the users provided by JsonPlaceholder but nah
        </div>
        <div className="flex w-full gap-4 justify-around text-xs font-medium">
          <p className="flex h-14 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]">
            I use this framework because I already worked with it.
          </p>
          <p className="flex h-14 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]">
            Fuck you Guillermo Rauch. Free Palestine 🇵🇸
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
