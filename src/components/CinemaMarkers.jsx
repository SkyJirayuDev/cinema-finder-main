import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Marker, Popup, useMap } from 'react-map-gl'
import allCinemas from '../data/cinemas'

const CinemaMarkers = () => {
  const map = useMap().current
  const [selectedCinema, setSelectedCinema] = useState(null)
  const params = useParams()
  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params
      return allCinemas.filter(cinema =>
        (franchiseId === 'all-cinemas' || cinema.franchise === franchiseId)
        && cinema.countryCode === countryCode
      )
    }
    return allCinemas
  }, [params])

  return (
    <>
      {cinemas.map((cinema, idx) => (
        <Marker
          key={idx}
          longitude={cinema.lng}
          latitude={cinema.lat}
          anchor="bottom"
          onClick={() => {
            map.flyTo({ center: [cinema.lng, cinema.lat], zoom: 14 })
            setSelectedCinema(cinema)
          }}
        />
      ))}

      {selectedCinema && (
        <Popup
          longitude={selectedCinema.lng}
          latitude={selectedCinema.lat}
          anchor="bottom"
          closeOnClick={false}
          onClose={() => setSelectedCinema(null)}
        >
          <div>
            <h3>{selectedCinema.name}</h3>
            <p>{selectedCinema.address}</p>
            {selectedCinema.phoneNumber && <p>{selectedCinema.phoneNumber}</p>}
          </div>
        </Popup>
      )}
    </>
  )
}

export default CinemaMarkers
