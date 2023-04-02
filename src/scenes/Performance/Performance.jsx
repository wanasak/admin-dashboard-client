import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import { useGetUserPerformanceQuery } from '../../state/api'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'

const Performance = () => {
  const userId = useSelector((state) => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId)
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 0.5,
    },
    {
      field: 'createdAt',
      headerName: 'createdAt',
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
      <Header
        title='PERFORMANCE'
        subtitle='Track your affiliate sales performace here'
      />
      <Box mt='40px' height='75vh'>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns || []}
        ></DataGrid>
      </Box>
    </Box>
  )
}

export default Performance
