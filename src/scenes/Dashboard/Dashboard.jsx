import React from 'react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from '@mui/icons-material'
import { useGetDashboardQuery } from '../../state/api'
import Header from '../../components/Header'
import FlexBetween from '../../components/FlexBetween'
import StatBox from '../../components/StatBox'
import OverviewChart from '../../components/OverviewChart'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from '../../components/BreakdownChart'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()
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
      <FlexBetween>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Report
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+14%'
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
          description='Since last month'
        />
        <StatBox
          title='Sales Today'
          value={data && data.todayStats.totalSales}
          increase='+21%'
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
          description='Since last month'
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          p='1rem'
          borderRadius='0.55rem'
          backgroundColor={theme.palette.background.alt}
        >
          <OverviewChart view='sales' isDashboard />
        </Box>
        <StatBox
          title='Monthly Sales'
          value={data && data.thisMonthStats.totalSales}
          increase='+5%'
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
          description='Since last month'
        />
        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%'
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
          description='Since last month'
        />

        {/* ROW 2 */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          <Typography variant='h6' color={theme.palette.secondary[100]}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography
            fontSize='0.8rem'
            p='0 0.6rem'
            sx={{
              color: theme.palette.secondary[200],
            }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
