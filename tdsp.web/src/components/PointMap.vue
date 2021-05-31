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
      @click="handleMapClick"
    >
      <l-tile-layer
        :url="tms_url"
      />
      <l-marker
        :lat-lng="coors"
        :draggable="true"
        @update:latLng="updateMarker"
      >
        <l-tooltip>事故位置</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
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
    }
  },
  mixins: [mapsettings],
  name: 'PointMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data () {
    return {
      markers: [],
      items: [],
      color: 'green',
      latlng: [],
      count: 0,
      gdata: {}
    }
  },
  watch: {
    coors (val) {
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    updateMarker (event) {
      this.$emit('CallBack', event)
      // this.coors = event.latlng
      // let coor = []
      // coor.push($event.lng)
      // coor.push($event.lat)
      // let gjson = this.gdata.coordinates
      // gjson.splice(id, 1, coor)
      // this.markers = []
      // let mark = []
      // mark.name = '事故点'
      // mark.latlng = [$event.lat,$event.lng]
      // this.markers.push(mark)
      // this.$emit('CallBack', { 'type': 'Point', 'coordinates': [$event.lng,$event.lat] })
    },
    handleMapClick (event) {
      this.$emit('CallBack', event.latlng)
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
