<template>
  <div>
    <l-map
      class="leafmap_div"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      :crs="crs"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="tms_url"
      />
      <l-geo-json
        :geojson="geojson"
      />
      <l-marker
        v-for="(item, index) in coors" :key="index"
        :lat-lng="item.coor"
        :name="item.name"
      >
        <l-tooltip>{{item.name}}</l-tooltip>
      </l-marker>
      <!-- <l-polygon
        :lat-lngs="coors"
        :color="color"
      >
        <l-tooltip>{{name}}</l-tooltip>
      </l-polygon> -->
      <!-- <l-marker
        v-for="c in markers"
        :key="c.name"
        :lat-lng="c.latlng"
        :name="c.name"
        :draggable="false"
        @update:latLng="updateMarker(c.id)"
      >
        <l-tooltip>{{c.name}}</l-tooltip>
        <l-popup>{{c.name}}</l-popup>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
import mapsettings from '@/plugins/mapsettings'
import L from 'leaflet'
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LTooltip
} from 'vue2-leaflet'
export default {
  props: {
    geojson: {
      type: Object,
      default: function () {
        return { 'type': 'Polygon', 'coordinates': [] }
      }
    },
    // 额外显示的点[{coor:lat-lng,name:name}]
    coors: {
      type: Array,
      default: null
    }
  },
  mixins: [mapsettings],
  name: 'Polygonview',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LTooltip
  },
  data () {
    return {
      markers: [],
      items: [],
      color: 'green',
      latlngs: [],
      gdata: null
    }
  },
  watch: {
    geojson: {
      handler (val) {
        if (val) {
          if (val.type === 'LineString') {
            this.center = [val.coordinates[0][1], val.coordinates[0][0]]
          } else if (val.type === 'Polygon') {
            let bounds = new L.LatLngBounds(val.coordinates[0])
            var c = bounds.getCenter()
            var latlng = [c.lng, c.lat]
            this.center = latlng
          }
        }
      },
      deep: true
    }
  },
  methods: {
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
