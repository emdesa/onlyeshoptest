'use client';

import dynamic from 'next/dynamic';

type MapWrapperProps = {
  defaultLat?: number;
  defaultLng?: number;
};

// Dynamic import ปิด SSR สำหรับ Leaflet
const Maplandmark = dynamic(() => import('./Maplandmark'), {
  ssr: false,
});

const MapWrapper = ({ defaultLat, defaultLng }: MapWrapperProps) => {
  return (
    <Maplandmark
      location={
        defaultLat !== undefined && defaultLng !== undefined
          ? { lat: defaultLat, lng: defaultLng }
          : undefined
      }
    />
  );
};

export default MapWrapper;
