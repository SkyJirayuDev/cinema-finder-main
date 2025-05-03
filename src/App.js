import React from 'react'
import { Paper, Box } from '@mui/material'
import Layout from './components/Layout'
import Map from './components/Map'
import AsideIndex from './components/AsideIndex'
import { FranchiseCinemasList, NearbyCinemasList } from './components/CinemaList'
import { Switch, Route } from 'react-router-dom'
import Provider from './components/Provider'
import loadable from '@loadable/component'

const NotFound = () => (
  <Box sx={{ p: 2 }}>
    404, Page Not Found!
  </Box>
)

const CinemaMarkers = loadable(() => import('./components/CinemaMarkers'))
const NearbyCinemaMarkers = loadable(() => import('./components/NearbyCinemaMarkers'))

const App = () => (
  <Provider>
    <Layout
      main={
        <Box sx={{ height: '100%' }}>
          <Map>
            <Switch>
              <Route exact path="/">
                <CinemaMarkers />
              </Route>
              <Route path="/nearby" component={NearbyCinemaMarkers} />
              <Route path="/:franchiseId/:countryCode" component={CinemaMarkers} />
            </Switch>
          </Map>
        </Box>
      }
      sidebar={
        <Paper sx={{ p: 1, height: '100%', overflowY: 'auto' }}>
          <Switch>
            <Route exact path="/" component={AsideIndex} />
            <Route path="/nearby" component={NearbyCinemasList} />
            <Route path="/:franchiseId/:countryCode" component={FranchiseCinemasList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Paper>
      }
    />
  </Provider>
)

export default App
