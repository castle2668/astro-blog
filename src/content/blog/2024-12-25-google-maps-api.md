---
title: '在 Next.js 中串接 Google Maps API'
excerpt: '在現代 Web 開發中，地圖服務是許多應用的重要元件。本文將介紹如何在 Next.js 中使用 Google Maps API，並展示一個包含地圖標記和互動功能的範例。'
tags: ['nextjs', 'googlemapsapi']
date: 2024-12-25
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2024-12-25-google-maps-api
---

## 設定 Google Maps API

### 1. 啟用 Google Maps API

第一步是前往 [Google Cloud Console](https://console.cloud.google.com)，開啟 Google Maps API 並建立 API 金鑰。記得限制金鑰的使用範圍以提高安全性。

### 2. 設定環境變數

將 API 金鑰儲存到 `.env.local` 檔案中，例如：`NEXT_PUBLIC_MAPS_API_KEY=你的API金鑰`。

## 開發地圖元件

### 1. 安裝 Google Maps 套件

安裝必要的套件，包含 Google Maps API 的 Loader，以及 GeoJSON 的 TypeScript 型別支援套件：

```bash
npm install @googlemaps/js-api-loader @types/geojson
```

### 2. 建立地圖元件

以下是 `Map` 元件的完整程式碼，它負責載入地圖並顯示標記，同時也綁定了 Click 事件，後續可以再依照需求加上互動功能：

```tsx
import { Loader } from '@googlemaps/js-api-loader'
import { FeatureCollection, Point } from 'geojson'
import { useEffect, useRef } from 'react'

interface MapProps {
  mapData: FeatureCollection | null
  handleClick: (marker: { lat: number; lng: number }) => void
}

const Map = ({ mapData, handleClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Import needed libraries
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places'],
      })
      const { Map } = await loader.importLibrary('maps')
      const { AdvancedMarkerElement } = await loader.importLibrary('marker')

      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: 22.61204890135084,
          lng: 120.30288007791076,
        },
        zoom: 13,
        mapTypeId: 'roadmap',
        mapId: 'YOUR_MAP_ID',
      }

      // Setup the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      // Create markers
      if (!mapData) return
      mapData.features.forEach(feature => {
        const coordinates = (feature.geometry as Point).coordinates
        // Create custom pin element for each feature
        const customPin = document.createElement('div')
        customPin.innerHTML = `<div id="marker-${feature.properties?.id}">TEST</div>`
        const faPin = new PinElement({
          glyph: customPin,
        })
        const marker = new AdvancedMarkerElement({
          map,
          position: {
            lat: coordinates[0], // 經度
            lng: coordinates[1], // 緯度
          },
          title: `${feature.properties?.name} - ${feature.properties?.site}`,
          content: faPin.element,
          gmpClickable: true,
        })
        // Add a click listener for each marker
        marker.addListener('click', () => {
          // ...
          // handle click event
        })
      })
    }

    initMap()
  }, [mapData, handleClick])

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
}

export default Map
```

### 3. 整合至頁面上

完成地圖元件後，就可以在 `page.tsx` 中呼叫 `Map` 元件，實際載入地圖：

```tsx
'use client'

import { useState, useEffect } from 'react'
import Map from '@/features/map/components'

const HomePage = () => {
  const [mapData, setMapData] = useState<FeatureCollection | null>(null)

  useEffect(() => {
    // 模擬 API 呼叫載入地圖資料
    fetch('/api/map')
      .then(res => res.json())
      .then(data => setMapData(data))
  }, [])

  const handleMarkerClick = (marker: { lat: number; lng: number }) => {
    console.log('Marker clicked:', marker)
  }

  return (
    <div>
      <h1>Google Maps in Next.js</h1>
      {mapData ? (
        <Map mapData={mapData} handleClick={handleMarkerClick} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  )
}

export default HomePage
```

## 處理地圖資料

GeoJSON 是一種處理地理資訊的 JSON 格式，我們可以根據格式規範，建立以下地圖資料：

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [120.30288, 22.61205] },
      "properties": { "name": "Location 1", "site": "Site 1" }
    }
  ]
}
```

可以使用 Next.js 的 API Route `/api/map` 模擬提供這些資料，並在地圖上渲染出標記。

## 結論

透過上述步驟，就可以在 Next.js 中成功整合 Google Maps API，實現地圖顯示、標記點擊等互動功能。這只是一個簡單的基礎實作，後續可以再進行更多擴展，像是整合更多自訂功能，例如搜尋和導航等等。
