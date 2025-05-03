// src/components/Layout.jsx
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
      overflow: 'hidden'
    }}>
      <Box sx={{
        flex: 1,
        height: '100%',
        overflow: 'auto'
      }}>
        {main}
      </Box>
      <Box sx={{
        width: '400px',
        height: '100%',
        overflowY: 'auto'
      }}>
        {sidebar}
      </Box>
    </Box>
  </Box>
)

export default Layout
