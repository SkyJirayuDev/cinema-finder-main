import React, { createContext, useContext, useState } from 'react'
const MapContext = createContext(null)
export const useMapContext = () => useContext(MapContext)
export const MapContextProvider = ({ children, value }) => {
  const [map, setMap] = useState(null)
  const [selectedCinema, setSelectedCinema] = useState(null)
  return (
    <MapContext.Provider value={{ ...value, map, setMap, selectedCinema, setSelectedCinema }}>
      {children}
    </MapContext.Provider>
  )
}
export default MapContext
