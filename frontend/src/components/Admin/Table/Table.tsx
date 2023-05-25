import { TableProps } from "./types"
import {
    Button,
    Row,
    Select,
    Table as AntdTable,
    Typography,
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
            <Row className='for-header'>
                <Row>
                    {
                        hasSort && sortTypes && (
                            <Select>
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
                </Row>
            </Row>
            <AntdTable
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                // pagination={isPagination}

            />
        </>
    )
}