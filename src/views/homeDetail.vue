<template>
  <b-container fluid v-if="soruce">
    <div v-if="name === 'universities'">
      <h4 align="right" class="mt-2">{{ soruce.university_name }}</h4>
      <hr />

      <b-form-row>
        <b-col align="right" align-self="stretch">
          <VueShowdown :markdown="soruce.description" flavor="github" />
          <h5 class="mr-2">
            كليات {{ soruce.university_name }}
            <small
              ><b-link @click="showCollages = !showCollages"
                >[{{ showLink }}]</b-link
              ></small
            >
          </h5>
          <hr class="col-md-3 col-sm-3 col-6 mr-2" align="right" />
          <b-form-row v-if="showCollages & !(collages.length === 0)">
            <b-col class="mt-3 mr-2">
              <ul v-for="n in soruce.collages_num" :key="n">
                <li>
                  <b-link class="linkColor">{{ collages[n - 1].name }}</b-link>
                </li>
              </ul>
            </b-col>
            <!-- <b-col class="mt-3 mr-2" v-if="soruce.collages_num === 5">
            <ul v-for="n in soruce.collages_num - 3" :key="n + 12">
              <li>{{ collages[n + 3].name }}</li> -->
            <!-- <li>{{ n }}</li> -->
            <!-- </ul>
          </b-col> -->
          </b-form-row>
        </b-col>

        <b-col
          align-self="start"
          order-sm="1"
          md="4"
          lg="4"
          xl="3"
          class="border ml-1 side-box-color"
        >
          <h5 class="text-center text-white border pb-2 pt-1 box-top-bgc">
            <font-awesome-icon icon="university" />
            {{ soruce.university_name }}
          </h5>
          <b-img center :src="soruce.logo" alt="kk" height="150"></b-img>
          <div class="table-responsive">
            <table class="table table-hover table-striped mt-2">
              <tbody class="text-right">
                <tr>
                  <th>التأسيس</th>
                  <td>{{ soruce.establishment }}</td>
                </tr>
                <tr>
                  <th>النوع</th>
                  <td>{{ soruce.type }}</td>
                </tr>
                <tr>
                  <th>البلد</th>
                  <td>
                    <b-img
                      class="img"
                      right
                      src="http://localhost:8000/media/images/11/01/20/iraq-flag-xs.jpg"
                      height="20"
                    ></b-img>
                    {{ soruce.country }}
                  </td>
                </tr>
                <tr>
                  <th>المحافظة</th>
                  <td>{{ soruce.province }}</td>
                </tr>
                <tr>
                  <th>الرئيس</th>
                  <td>{{ soruce.president }}</td>
                </tr>
                <tr>
                  <th>عدد الكليات</th>
                  <td>{{ soruce.collages_num }}</td>
                </tr>
                <tr>
                  <th>عدد الطلاب</th>
                  <td>{{ soruce.students_num }}</td>
                </tr>
                <tr>
                  <th>الموقع</th>
                  <td>
                    <a :href="soruce.website">اضغط هنا</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-form-row>
    </div>
    <b-container v-if="name === 'news'" align="right">
      <VueShowdown :markdown="soruce.description" flavor="github" />
    </b-container>
  </b-container>
</template>

<script>
import shared from '../shared'
export default {
  data() {
    return {
      showCollages: true,
      collages: [],
      soruce: '',
      name: ''
    }
  },
  computed: {
    showLink: function() {
      if (this.showCollages === true) {
        return 'اخف'
      } else {
        return 'أظهر'
      }
    }
  },
  mounted() {
    ;(this.name = this.$route.params.name),
      shared
        .fetchData(this.$route.params.name + '/' + this.$route.params.id)
        .then((res) => {
          this.soruce = res
          shared
            .fetchData(
              `collages?university__university_name=${this.soruce.university_name}&page_size=${this.soruce.collages_num}`
            )
            .then((res) => {
              // console.log(res.results[0].name)
              this.collages = res.results
            })
        })
  }
}
</script>
<style lang="scss" scoped>
// $grid-breakpoints: (
//   xs: 0,
//   sm: 480px,
//   md: 768px,
//   lg: 1024px,
// );
.side-box-color {
  background-color: rgb(253, 253, 253);
}
.img {
  position: relative;
  top: 5px;
}
.box-top-bgc {
  background-color: rgb(224, 134, 134);
}
.linkColor:hover {
  color: rgb(187, 48, 48);
}
</style>
