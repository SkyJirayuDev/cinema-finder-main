import React, { useMemo, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import useEventListener from '@use-it/event-listener'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import allCinemas from '../../data/cinemas'
import { totalBounds } from '../../data/bounds'

Icon.Default.prototype.options.iconUrl = markerIcon
Icon.Default.prototype.options.iconRetinaUrl = markerIcon2x
Icon.Default.prototype.options.shadowUrl = markerShadow

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar()
  const map = useMap()
  useEventListener('map.snapTo', ({ detail: { lat, lng } }) => {
    try {
      map.flyTo([lat, lng], 14, { duration: 0.5, easeLinearity: 1 })
    } catch (e) {
      enqueueSnackbar('Unexpected error while attempting map navigation', { variant: 'error' })
    }
  })
  return null
}

const convertBounds = ([w, s, e, n]) => [[s, w], [n, e]]

const CinemaMarkers = () => {
  const map = useMap()
  const [activeCinema, setActiveCinema] = useState(null)
  const params = useParams()
  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params
      return allCinemas.filter(cinema =>
        (franchiseId === 'all-cinemas' || cinema.franchise === franchiseId) &&
        cinema.countryCode === countryCode
      )
    }
    return allCinemas
  }, [params])

  return (
    <>
      {cinemas.map((cinema, idx) => (
        <Marker
          key={idx}
          position={[cinema.lat, cinema.lng]}
          eventHandlers={{
            click: () => {
              map.flyTo([cinema.lat, cinema.lng], 15)
              setActiveCinema(cinema)
            }
          }}
        />
      ))}

      {activeCinema && (
        <Popup
          position={[activeCinema.lat, activeCinema.lng]}
          closeOnClick={false}
          onClose={() => setActiveCinema(null)}
        >
          <div>
            <h3>{activeCinema.name}</h3>
            <p>{activeCinema.address}</p>
            {activeCinema.phoneNumber && <p>{activeCinema.phoneNumber}</p>}
          </div>
        </Popup>
      )}
    </>
  )
}

const LeafletMap = () => (
  <MapContainer
    bounds={convertBounds(totalBounds)}
    style={{ height: '100%', backgroundColor: '#99b3cc' }}
    zoomSnap={0.5}
    zoomDelta={0.5}
  >
    <MapSnappingEventListener />
    <TileLayer
      attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, CC BY 3.0 — Map data © OpenStreetMap contributors'
      url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}'
      subdomains='abcd'
      minZoom={0}
      maxZoom={18}
      ext='png'
    />
    <CinemaMarkers />
  </MapContainer>
)

export default LeafletMap
