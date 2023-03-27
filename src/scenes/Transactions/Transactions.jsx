import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar'
import Header from '../../components/Header'
import { useGetTransactionsQuery } from '../../state/api'

const Transactions = () => {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    search,
    sort: JSON.stringify(sort),
  })

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='TRANSACTIONS' subtitle='List of Transactions'></Header>
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[100]}`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns || []}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode='server'
          sortingMode='server'
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        ></DataGrid>
      </Box>
    </Box>
  )
}

export default Transactions
