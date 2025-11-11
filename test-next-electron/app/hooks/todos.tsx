'use client'

import { useQuery } from '@tanstack/react-query';
import { Todo as TodoInteface } from '../types/todo';

interface todosHookProps {
  todoId: number;
}

function useTodos (props : todosHookProps ) {

  const { todoId } = props

  const { data: todo, error: todoErr, isLoading: todoIsLoading } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: async () => {
      const response = (await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)).json()
      return await response as TodoInteface
    },
  })

  const { data: todos, error: todosErr, isLoading: todosIsLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => await fetch(`https://jsonplaceholder.typicode.com/todos`)
  })

  return {
    todo,
    todoErr,
    todoIsLoading,
    todos,
    todosErr,
    todosIsLoading,
  };
};

export default useTodos;
