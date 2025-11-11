import { FC } from "react";
import { Todo as TodoInterface } from "../types/todo";

interface TodoProps {
  todoId: number;
  todo?: TodoInterface;
  setTodoId: (id: number) => void;
  isLoading: boolean;
}

const Todo: FC<TodoProps> = (props: TodoProps) => {
  const { todoId, setTodoId, todo, isLoading } = props;

  const modifyId = (remove?: boolean) => {
    !remove ? setTodoId(todoId + 1) : setTodoId(todoId - 1);
  };

  return (
    <div className="w-full rounded-2xl border-solid border border-zinc-700 p-4 text-xs">
      <h4 className="text-2xl w-full flex justify-between">
        Current Todo id: {todoId}{" "}
        <div className="flex gap-2">
          <button
            className="rounded-full bg-green-900 h-8 w-8 text-zinc-50 active:bg-green-800"
            onClick={() => modifyId()}>
            +
          </button>
          <button
            className="rounded-full bg-red-900 h-8 w-8 text-zinc-50 active:bg-red-800 disabled:bg-red-950"
            disabled={todoId <= 0}
            onClick={() => modifyId(true)}>
            -
          </button>
        </div>
      </h4>
      <div className="mt-4 pt-4 border-solid border-t border-amber-50 flex gap-1">
        {todo &&
          Object.keys(todo).length > 0 &&
          Object.keys(todo).map((k, i) => (
            todo && k && <div key={i} className="flex-1 py-2">
              {String(todo[k as keyof TodoInterface])}
            </div>
          ))}
        {
          isLoading && <div className="py-2 w-full text-center">Loading, pls wait...</div>
        }
        {
          todo && Object.keys(todo).length == 0 && <div className="py-2 flex-1 text-center">Try add the counter...</div>
        }
      </div>
    </div>
  );
};

export default Todo;
