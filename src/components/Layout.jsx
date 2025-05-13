import React from 'react'
import { Box } from '@mui/material'
import TopBar from './TopBar'

const TOPBAR_HEIGHT = 64

const Layout = ({ sidebar, main }) => (
  <Box sx={{
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <Box sx={{ height: `${TOPBAR_HEIGHT}px` }}>
      <TopBar />
    </Box>
    <Box sx={{
      flex: 1,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      overflow: 'hidden'
    }}>
      <Box sx={{
        flex: 1,
        height: { xs: '50%', md: '100%' },
        overflow: 'auto'
      }}>
        {main}
      </Box>
      <Box sx={{
        width: { xs: '100%', md: '400px' },
        height: { xs: '50%', md: '100%' },
        overflowY: 'auto',
        borderLeft: { xs: 'none', md: '1px solid #ccc' }
      }}>
        {sidebar}
      </Box>
    </Box>
  </Box>
)

export default Layout
