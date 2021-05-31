<template>
  <div>
    <l-map
      class="leafmap_div"
      :zoom="11"
      :options="mapOptions"
      :crs="crs"
      :center="[38.88862,118.89573]"
    >
      <l-tile-layer
        :url="tms_url"
      />
      <l-track-symbol
        v-for="(item,index) in markers"
        :key="index"
        :latLng="setlatlng(index)"
        :speed=0
        :course=0
        :heading=0
        :symbolStyle="setstyle(item.color)"
      >
        <l-tooltip :options="tooltipOptions">{{item.desc}}</l-tooltip>
      </l-track-symbol>
    </l-map>
  </div>
</template>

<script>
import LTrackSymbol from 'vue-leaflet-tracksymbol/src/components/LTrackSymbol'
import L from 'leaflet'
import mapsettings from '@/plugins/mapsettings'
import {
  LMap,
  LTileLayer,
  LTooltip
} from 'vue2-leaflet'
export default {
  props: {
    markers: {
      type: Array,
      default () {
        return []
      }
    }
  },
  name: 'ShipMarkersMap',
  mixins: [mapsettings],
  components: {
    LMap,
    LTileLayer,
    LTooltip,
    LTrackSymbol
  },
  data () {
    return {
      tooltipOptions: {
        permanent: true,
        direction: 'bottom',
        offset: L.point(0, 10),
        opacity: 0.8
      }
    }
  },
  methods: {
    setlatlng (id) {
      let lat = 38.875192
      let lng = 118.401684
      lng = lng + 0.07 * id
      return { lat: lat, lng: lng }
    },
    setstyle (item) {
      return {
        color: item,
        fill: false,
        fillColor: item,
        fillOpacity: 1,
        stroke: true
      }
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    }
  }
}
</script>
<style scoped>
  .leafmap_div {
    width: 100%;
    height: 300px;
    position: relative;
    outline: none;
}
</style>
