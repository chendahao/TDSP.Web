<template>
  <v-row class="ml-0 mr-0"
    style="min-width:900px;overflow-x:scroll"
  >
    <v-col cols="12" sm="12" md="9" lg="9" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <v-row class="ml-0 mr-0">
        <shiptype></shiptype>
      </v-row>
      <v-row class="mt-6 ml-0 mr-0">
        <planaction></planaction>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <v-row class="ml-0 mr-0">
        <user></user>
      </v-row>
      <v-row class="mt-6 ml-0 mr-0">
        <weather></weather>
      </v-row>
    </v-col>
    <!-- <v-col cols="12" sm="12" md="4" lg="4" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <kj></kj>
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="8" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <throughput></throughput>
    </v-col> -->
    <v-col cols="12" sm="12" md="7" lg="7" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <tide></tide>
    </v-col>
    <v-col cols="12" sm="12" md="5" lg="5" :style="{'background-color':$vuetify.theme.dark? '#082338':'#f1f5f8'}">
      <news></news>
    </v-col>
  </v-row>
</template>

<script>
import user from '@/components/HomeComponents/user'
import shiptype from '@/components/HomeComponents/shiptype'
import weather from '@/components/HomeComponents/weather'
import planaction from '@/components/HomeComponents/planaction'
import news from '@/components/HomeComponents/news'
import tide from '@/components/HomeComponents/tide'
import kj from '@/components/HomeComponents/kj'
import throughput from '@/components/HomeComponents/throughput'
export default {
  components: {
    user,
    shiptype,
    weather,
    planaction,
    news,
    kj,
    throughput,
    tide
  },
  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
  .index_grid{
    background-color: #f1f5f8;
  }
  .inner_grid{
    padding: 10px;
  }
  .planaction{
    overflow-y: scroll;
  }
  @media screen and (max-width: 1400px) {
    .index_grid{
      background-color: #f1f5f8;
      width: 100%;
      flex-basis: 100% !important;
      max-width: 100% !important;
    }
  }
</style>
