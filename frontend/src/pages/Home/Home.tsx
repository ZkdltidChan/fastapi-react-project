import React, { useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import { TaskResponseProps, TASK_URL, ListResponseProps } from '../../api/config';

type Props = {}

const Home = (props: Props) => {
  const { fetchData, response, isLoading: topIsLoading } = useAxios<TaskResponseProps>()
  useEffect(() => {
      fetchData('GET', TASK_URL)
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home