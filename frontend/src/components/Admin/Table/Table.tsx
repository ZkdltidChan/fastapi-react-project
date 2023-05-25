import { TableProps } from "./types"
import {
    Button,
    Row,
    Select,
    Table as AntdTable,
    Typography,
    Space,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

export const Table: React.FC<TableProps> = (props) => {
    const {
        isPagination = true,
        totalPages = 0,
        pageSize = 30,
        currentPage = 1,
        totalCount = 0,
        isLoading = false,
        title = '',
        columns = [],
        hasCustomRow = false,
        dataSource = '',
        subUrl = '',
        hasNew = false,
        hasSort = false,
        sortTypes = [],
        sortOrder = '오름차순',

        hasChangeOrder = false,

        hasSearch = false,
        searchPlaceholder = '검색어를 입력하세요.',
        hasDownload = false,
        downloadLoading = false,
        downloadTitle = '',
    } = props;
    const navigate = useNavigate();
    const onNew = () => {
        navigate('/' + subUrl + '/new')
    }
    return (
        <>
            {/* {title && (<Typography.Title>{title}</Typography.Title>)} */}
            <br />
            <Row justify='center'>
                <Space align="center" >
                    {
                        hasSort && sortTypes && (
                            <Select style={{ width: '100px' }}>
                                {
                                    sortTypes.map((sortType, index) => {
                                        return (
                                            <option key={index}>{sortType}</option>
                                        )
                                    })}
                            </Select>
                        )
                    }
                    {
                        hasSearch && (
                            <Button>
                                검색
                            </Button>
                        )
                    }
                    {
                        hasNew && (
                            <Button onClick={onNew}>
                                NEW
                            </Button>
                        )
                    }
                </Space>
            </Row>
            <br />
            <AntdTable
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
            // pagination={isPagination}

            />
        </>
    )
}