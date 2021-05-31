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
      <l-geo-json
        v-if="count>=2"
        :geojson="gdata"
      />
      <!-- <l-polygon
        :lat-lngs="coors"
        :color="color"
      >
        <l-tooltip>{{name}}</l-tooltip>
      </l-polygon> -->
      <l-marker
        v-for="c in markers"
        :key="c.name"
        :lat-lng="c.latlng"
        :name="c.name"
        :draggable="true"
        @update:latLng="updateMarker($event,c.id)"
      >
        <!-- <l-tooltip>{{c.name}}</l-tooltip>
        <l-popup>{{c.name}}</l-popup> -->
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
  LGeoJson
} from 'vue2-leaflet'
export default {
  props: {
    geojson: {
      type: Object,
      default: function () {
        return { 'type': 'LineString', 'coordinates': [] }
      }
    }
  },
  mixins: [mapsettings],
  name: 'TrafficLineMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson
  },
  data () {
    return {
      markers: [],
      items: [],
      color: 'green',
      latlngs: [],
      count: 0,
      gdata: {}
    }
  },
  // beforeMount() {
  //   console.log(this.geojson)
  //   if(this.geojson.coordinates.length>0){
  //     this.center = [this.geojson.coordinates[0][1], this.geojson.coordinates[0][0]]
  //     this.count=2
  //     for (let i = 0; i < this.geojson.coordinates.length; i++) {
  //       const element = this.geojson.coordinates[i];
  //       let marker=[]
  //       marker.id=i
  //       marker.name= '点' + i.toString()
  //       marker.latlng=[element[1],element[0]]
  //       this.markers.push(marker)
  //     }
  //   }
  // },

  watch: {
    geojson: {
      handler (val) {
        this.gdata = val
        if (val.coordinates.length > 0 && this.markers.length <= 0) {
          this.center = [val.coordinates[0][1], val.coordinates[0][0]]
          this.count = 2
          for (let i = 0; i < val.coordinates.length; i++) {
            const element = val.coordinates[i]
            let marker = []
            marker.id = i
            marker.name = '点' + i.toString()
            marker.latlng = [element[1], element[0]]
            this.markers.push(marker)
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
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    updateMarker ($event, id) {
      let coor = []
      coor.push($event.lng)
      coor.push($event.lat)
      let gjson = this.gdata.coordinates
      gjson.splice(id, 1, coor)
      this.$emit('CallBack', { 'type': 'LineString', 'coordinates': gjson })
    },
    handleMapClick (event) {
      if (this.count >= 2) return
      // count=2
      if (this.count === 0) {
        this.gdata = { 'type': 'LineString', 'coordinates': [] }
      }
      this.count += 1
      if (this.count < 3) {
        let mark = []
        mark.id = this.count - 1
        mark.name = '点' + this.count.toString()
        mark.latlng = event.latlng
        this.markers.push(mark)
        let coordinates = []
        coordinates.push(event.latlng.lng)
        coordinates.push(event.latlng.lat)
        this.gdata.coordinates.push(coordinates)
        if (this.count === 2) {
          this.$emit('CallBack', this.gdata)
        }
      }
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
