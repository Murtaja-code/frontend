//  <div v-for="university in data" :key="university.id">
//         <b-card
//           align="right"
//           no-body
//           class="overflow-hidden mb-5 border-0 card-scale"
//           style="max-width: 540px;"
//         >
//           <b-row no-gutters>
//             <b-col md="6">
//               <b-link>
//                 <b-card-img :src="university.image" rounded height="220">
//                 </b-card-img>
//               </b-link>
//             </b-col>
//             <b-link class="col-sm-6 text-dark dec">
//               <b-card-body :title="university.name" class="dec">
//                 <b-card-text class="mr-2 ml-1">
//                   {{ university.card_text }}
//                 </b-card-text>

//                 <small class="text-muted">
//                   <hr class="col-4" />
//                   <b-icon icon="clock" variant="dark"></b-icon>
//                   {{ getDate(university.last_updated) }}
//                 </small>
//               </b-card-body>
//             </b-link>
//           </b-row>
//         </b-card>
//       </div>


// <template>
//   <b-container v-if="data">
//     <h2 align="center" class="mt-2">جامعتي</h2>
//     <hr class="col-sm-7 col-md-8 col-lg-9 hr-title" />

//     <b-card-group class="mt-2">
//       <div
//         v-for="university in data.results"
//         :key="university.id"
//         class="col-sm-6 col-lg-4 mb-4"
//       >
//         <b-card align="right" class="border-0 card-scale" no-body>
//           <b-link class="text-dark dec">
//             <b-card-img
//               :src="university.image"
//               class="rounded mb-3 blur"
//               height="170"
//               no-body
//               img-top
//               :alt="university.image"
//             />
//             <b-card-text class="dec">
//               <h5 class="card-title">{{ university.university_name }}</h5>
//               {{ university.card_text }}
//             </b-card-text>
//           </b-link>

//           <small class="text-muted">
//             <hr class="col-4 hr-time" />
//             <b-icon icon="clock" variant="dark"></b-icon>
//             {{ getDate(university.last_updated) }}
//           </small>
//         </b-card>
//       </div>
//     </b-card-group>
//     <!-- say you have total-rows=24 and per-page=12means the pagin will be 1_2
//      cos for every page will be 12 cards and the total.. is just 24 cards -->
//     <b-pagination
//       v-model="currentPage"
//       :total-rows="data.count"
//       per-page="3"
//       prev-text="السابق"
//       next-text="التالي"
//       limit="4"
//       align="center"
//       pills
//       @input="fetchData"
//       hide-goto-end-buttons
//       first-number
//       last-number
//     ></b-pagination>
//   </b-container>
// </template>

// <script>
// import { mapState } from 'vuex'
// export default {
//   data() {
//     return {
//       currentPage: 1
//       // date: []
//     }
//   },
//   computed: {
//     ...mapState({
//       data: (state) => state.cardModel.data
//     })
//   },

//   methods: {
//     fetchData() {
//       this.$store.dispatch('cardModel/cardData', {
//         url: 'universities',
//         pageNum: this.currentPage
//       })
//     },

//     getDate(last_updated) {
//       // this.$store
//       //   .dispatch('cardModel/getDate', this.currentPage)
//       //   .then((res) => {
//       //     console.log(res)
//       //   })

//       var date = new Date(last_updated)
//       var months = [
//         'يناير',
//         'فبراير',
//         'مارس',
//         'إبريل',
//         'مايو',
//         'يونيو',
//         'يوليو',
//         'أغسطس',
//         'سبتمبر',
//         'أكتوبر',
//         'نوفمبر',
//         'ديسمبر'
//       ]
//       var days = [
//         'اﻷحد',
//         'اﻷثنين',
//         'الثلاثاء',
//         'اﻷربعاء',
//         'الخميس',
//         'الجمعة',
//         'السبت'
//       ]
//       var delDateString =
//         days[date.getDay()] +
//         ', ' +
//         date.getDate() +
//         ' ' +
//         months[date.getMonth()] +
//         ', ' +
//         date.getFullYear()
//       return delDateString
//     }
//   },

//   mounted() {
//     // this.currentPage = 1
//     this.$store.dispatch('cardModel/cardData', {
//       url: 'universities',
//       pageNum: this.currentPage
//     })
//     console.log('ddsddsd')
//   }
// }
// </script>
// <style lang="scss" scoped>
// @media only screen and (min-width: 600px) {
//   .card-scale:hover {
//     transform: scale(1.02);
//   }
//   .blur:hover {
//     filter: opacity(80%);
//   }
// }
// @media only screen and (max-width: 600px) {
//   .hr-title {
//     width: 60%;
//   }
// }
// .dec:hover {
//   text-decoration: none;
//   color: rgb(187, 48, 48);
// }
// .hr-time {
//   position: relative;
//   left: 27%;
// }
// </style>



// fetchData: (info) => {
//   return fetch(`${store.state.tokenModel.url + info.url}?page=${info.pageNum}&page_size=${info.pageSize}`)
//     .then((res) => {return res.json()})
//     .then((data) => {
//       // console.log(data)
//       // returning data to fetch
//       return data
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }}


