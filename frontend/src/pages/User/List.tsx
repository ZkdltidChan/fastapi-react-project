import useAxios from '../../hooks/useAxios';
import { Table } from '../../components/Admin/Table/Table';
import { USERS_URL, UsersResponseProps, ListResponseProps } from '../../api/config';
import { useEffect } from 'react';
type Props = {}

const UserList = (props: Props) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
    // const navigate = useNavigate()
    const { fetchData, response, isLoading: isLoading } = useAxios<ListResponseProps<UsersResponseProps>>()
    useEffect(() => {
        fetchData('GET', USERS_URL, {}, headers)
        // if (response?.id) {
        //     console.log(response)
        //   }
    }, [])

    return (
        <>
            <Table
                hasNew={true}
                hasSort={true}
                sortTypes={['asc', 'desc']}

                isLoading={isLoading}
                subUrl='/user'
                totalPages={0}
                pageSize={0}
                currentPage={0}
                totalCount={0}

                loading={isLoading}
                scroll={{ x: 500 }}
                dataSource={response?.data_list || []}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: '10%'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                        width: '10%'
                    },
                    {
                        title: 'First Name',
                        dataIndex: 'first_name',
                        key: 'first_name',
                        width: '10%'
                    },
                    {
                        title: 'Last Name',
                        dataIndex: 'last_name',
                        key: 'last_name',
                        width: '10%'
                    },
                    {
                        title: 'Is Active',
                        dataIndex: 'is_active',
                        key: 'is_active',
                        width: '10%'
                    },
                    {
                        title: 'Is Superuser',
                        dataIndex: 'is_superuser',
                        key: 'is_superuser',
                        width: '10%'
                    }
                ]}
            />
        </>)
}

export default UserList