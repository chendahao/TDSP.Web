import { latLng } from 'leaflet'

const mixin = {
  data: function () {
    return {
      zoom: 10,
      center: latLng(38.875192, 118.378684),
      tms_url: '/maps/gwc/service/tms/1.0.0/cchp%3Acchp@EPSG%3A900913@png/{z}/{x}/{-y}.png',
      crs: null,
      mapOptions: {
        zoomSnap: 1,
        trackResize: true
      }
    }
  }
}

export default mixin
