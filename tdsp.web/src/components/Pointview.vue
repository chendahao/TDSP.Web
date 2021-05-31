<template>
  <div>
    <l-map
      class="leafmap_div"
      :zoom="zoom"
      :center="coors"
      :options="mapOptions"
      :crs="crs"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="tms_url"
      />
      <!-- <l-geo-json
        :geojson="geojson"
      /> -->
      <!-- <l-polygon
        :lat-lngs="coors"
        :color="color"
      >
        <l-tooltip>{{name}}</l-tooltip>
      </l-polygon> -->
      <l-marker
        v-if="coors"
        :lat-lng="coors"
        :draggable="false"
      >
        <!-- @update:latLng="updateMarker(name)" -->
        <l-tooltip>{{name}}</l-tooltip>
        <!-- <l-popup>{{name}}</l-popup> -->
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import api from '@/api/navenv/AnchorageApi'
import L from 'leaflet'
import mapsettings from '@/plugins/mapsettings'
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip
} from 'vue2-leaflet'
export default {
  props: {
    coors: {
      type: Array,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  mixins: [mapsettings],
  name: 'Pointview',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data () {
    return {
      geojson: null,
      markers: [],
      items: [],
      color: 'green'
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    fetchData () {
      api.GetAll().then(res => {
        this.items = res.data.values.map(x => {
          return x.coordinates
        })
        this.geojson = res.data.values.map(x => {
          return {
            type: 'Feature',
            geometry: x.polygon,
            properties: { name: x.name }
          }
        })
        this.markers = res.data.values.map(x => {
          let bounds = new L.LatLngBounds(x.polygon.coordinates[0])
          var c = bounds.getCenter()
          var latlng = [c.lng, c.lat]
          return { id: x.name, name: x.name, latlng: latlng }
        })
      })
    },

    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    // updateMarker (latlng) {
    //   console.log(latlng)
    // },
    showLongText () {
      this.showParagraph = !this.showParagraph
    }
  }
}
</script>
<style scoped>
.leafmap_div {
  width: 100%;
  height: 400px;
  position: relative;
  outline: none;
}
</style>
