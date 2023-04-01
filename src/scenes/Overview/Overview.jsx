import React, { useState } from 'react'
import { Box, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import Header from '../../components/Header'
import OverviewChart from '../../components/OverviewChart'

const Overview = () => {
  const [view, setView] = useState('units')

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='OVERVIEW'
        subtitle='Overview of general revenue and profit'
      ></Header>
      <Box height='75vh'>
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label={view}
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view}></OverviewChart>
      </Box>
    </Box>
  )
}

export default Overview
