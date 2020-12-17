<template>
  <b-container fluid v-if="soruce">
    <div v-if="name === 'universities'" align="right">
      <h4 class="mt-2">
        {{ soruce.university_name }}
      </h4>

      <hr />

      <b-form-row>
        <b-col align-self="stretch">
          <VueShowdown :markdown="soruce.description" flavor="github" />

          <h5 class="mr-2">
            كليات {{ soruce.university_name }}
            <small>
              <b-link
                v-b-toggle.collapse-3
                @click="showCollages = !showCollages"
              >
                [{{ showLink }}]</b-link
              >
            </small>
          </h5>

          <hr class="col-md-3 col-sm-3 col-6 mr-2" />

          <b-form-row v-if="!(collages.length === 0)">
            <b-collapse visible appear id="collapse-3">
              <b-card class="border-0">
                <b-col class="mr-2">
                  <ul v-for="n in soruce.collages_num" :key="n">
                    <li>
                      <!-- i could use state to pass url and not this  -->
                      <b-link
                        :to="
                          '/university/collage/' +
                            soruce.university_name +
                            '/' +
                            collages[n - 1].name
                        "
                        class="linkColor"
                        >{{ collages[n - 1].name }}</b-link
                      >
                    </li>
                  </ul>
                </b-col>
              </b-card>
            </b-collapse>
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
          <!-- <div class="mr-2 text-center">
            <small
              >لتقييم <strong>{{ soruce.university_name }}</strong> اضغط على
              النجوم!
            </small>
          </div> -->
          <Rating
            class="text-center"
            :id="soruce.id"
            :arb_name="soruce.university_name"
            building="university"
            sub_url="university_ratings?university__id="
          />

          <b-table-simple responsive striped hover>
            <b-tbody class="text-right">
              <b-tr>
                <b-th>التأسيس</b-th>
                <b-td>{{ soruce.establishment }}</b-td>
              </b-tr>
              <b-tr>
                <b-th>البلد </b-th>
                <b-td>
                  <b-img
                    class="img"
                    right
                    src="http://localhost:8000/media/images/11/08/20/iraq-flag-xs.jpg"
                    height="20"
                  ></b-img>
                  {{ soruce.country }}
                </b-td>
              </b-tr>
              <b-tr v-for="n in 4" :key="n">
                <b-th>{{ sideTableTitle[n - 1] }}</b-th>
                <b-td>{{ sideTableContent[n - 1] }}</b-td>
              </b-tr>

              <b-tr>
                <b-th>الموقع</b-th>
                <b-td><a :href="soruce.website">اضغط هنا</a></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-form-row>
      <h6 class="mt-2">تقييم و مراجعات {{ soruce.university_name }}</h6>
      <hr class="col-md-3 col-sm-3 col-6" align="right" />
    </div>

    <b-container class="col-md-8" v-if="name === 'news'" align="right">
      <VueShowdown :markdown="soruce.description" flavor="github" />
    </b-container>
  </b-container>
</template>

<script>
import shared from '../shared'
import Rating from '../components/rating'
import Review from '../components/review'

export default {
  components: {
    Rating,
    Review
  },
  data() {
    return {
      sideTableTitle: ['المحافظة', 'الرئيس', 'عدد الكليات', 'عدد الطلاب'],
      sideTableContent: [],
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

          this.sideTableContent = [
            this.soruce.province,
            this.soruce.president,
            this.soruce.collages_num,
            this.soruce.students_num
          ]
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
<style lang="scss">
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
