'use client'

import { useQuery } from '@tanstack/react-query';

interface usersHookProps {
  userId: number;
}

function useUsers (props : usersHookProps ) {

  const { userId } = props

  const { data: user, error: userErr, isLoading: userIsLoading } = useQuery({
    queryKey: ["todo", userId],
    queryFn: async () => await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  })

  const { data: users, error: usersErr, isLoading: usersIsLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => await fetch(`https://jsonplaceholder.typicode.com/users`)
  })

  return {
    user,
    userErr,
    userIsLoading,
    users,
    usersErr,
    usersIsLoading
  };
};

export default useUsers;
