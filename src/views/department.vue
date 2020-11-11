<template>
  <b-container align="right" fluid v-if="soruce !== ''">
    <h3 class="mt-2">هندسة الحاسبات</h3>
    <hr />
    <b-container fluid-md class="col-md-8">
      <VueShowdown :markdown="soruce.description" flavor="github" />
    </b-container>

    <!-- <h6 v-b-toggle.collapse-3 @click="showCollages = !showCollages">
      <b-icon :icon="showLink[1]"></b-icon>
      منهاج هندسة الحاسبات
      <small>
        <b-link> اظغط {{ showLink[0] }} المنهاج </b-link>
      </small>
    </h6>

    <hr class="col-sm-4 col-md-2 col-xl-2 col-8" align="right" />
    <b-collapse id="collapse-3" class="mb-2">
      <b-form-row>
        <b-col order="1" class="col-md-4 col-12 mb-2" v-for="n in 6" :key="n">
          <b-list-group>
            <b-list-group-item
              v-for="i in 5"
              :key="i"
              :variant="varints[i - 1]"
            >
              {{ n }}باسم مدرسة الحقوق</b-list-group-item
            >
          </b-list-group>
        </b-col>
      </b-form-row>
    </b-collapse> -->

    <h6>معلومات اضافية حول القسم:</h6>
    <hr class="col-sm-4 col-md-2 col-xl-2 col-6" align="right" />

    <!-- to add border and center the col-->
    <b-collapse visible appear>
      <b-row align-h="center" no-gutters>
        <b-col class="col-md-8 border">
          <b-table-simple responsive striped hover>
            <b-tbody>
              <b-tr>
                <b-th>التأسيس</b-th>
                <b-td>{{ soruce.establishment }}</b-td>
              </b-tr>

              <b-tr>
                <b-th>التعيين</b-th>
                <b-td v-if="soruce.central_designation === false"
                  >ليس مركزي</b-td
                >
                <b-td v-if="soruce.central_designation === true">مركزي</b-td>
              </b-tr>

              <b-tr v-for="n in 3" :key="n">
                <b-th>{{ booleanFieldTitle[n - 1] }}</b-th>
                <b-td v-if="soruce[booleanFieldContent[n - 1]] === false"
                  >لا يوجد</b-td
                >
                <b-td v-if="soruce[booleanFieldContent[n - 1]] === true"
                  >موجود</b-td
                >
              </b-tr>

              <b-tr>
                <b-th>الحدود الدنيا</b-th>
                <b-td>
                  السنة <b-icon icon="arrow-left-circle"></b-icon> المعدل<br />

                  <span v-for="y in years" :key="y"
                    >{{ y }} <b-icon icon="arrow-left-circle"></b-icon>
                    {{ soruce.sum[y] }} <br />
                  </span>
                </b-td>
              </b-tr>

              <b-tr v-for="n in 8" :key="title[n - 1]">
                <b-th>{{ title[n - 1] }}</b-th>
                <b-td>{{ soruce[content[n - 1]] }}</b-td>
              </b-tr>

              <b-tr>
                <b-th>جامعات أخرا تحتوي هذا القسم</b-th>
                <b-td v-for="u in soruce.other_universities" :key="u">{{
                  u
                }}</b-td>
              </b-tr>

              <b-tr>
                <b-th>الراتب الشهري</b-th>
                <b-td>{{ soruce.salary_pm }} الف دينار عراقي</b-td>
              </b-tr>
              <b-tr>
                <b-th>الموقع</b-th>
                <b-td
                  ><b-link :href="soruce.website"
                    >{{ soruce.website }}
                  </b-link></b-td
                >
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-collapse>
  </b-container>
</template>

<script>
import shared from '../shared'

export default {
  data() {
    return {
      booleanFieldTitle: ['دراسة عليا', 'دراسة مسائية', 'دراسة اهلية'],
      booleanFieldContent: ['higher_educ', 'evening_study', 'private_study'],
      title: [
        'عدد الطلاب',
        'شهادة التخرج',
        'نظام دراسة',
        'عدد سنوات الدراسة',
        'مكان العمل',
        'العنوان الوضيفي',
        'الفرع المقبول',
        'لغة الدراسة'
      ],
      content: [
        'students_num',
        'certi_of_gradu',
        'study_system',
        'years_of_study',
        'place_of_work',
        'job_title',
        'accepted_branch',
        'language_of_study'
      ],
      years: ['2020', '2019', '2018', '2017', '2016'],
      showCollages: false,
      varints: ['info', 'light', 'light', 'light', 'light'],
      soruce: ''
    }
  },
  // computed: {
  //   showLink: function() {
  //     if (this.showCollages === true) {
  //       const n = ['لأخفاء', 'arrow-up-circle-fill']
  //       return n
  //     } else {
  //       const n = ['لأظهار', 'arrow-down-circle-fill']
  //       return n
  //     }
  //   }
  // },
  mounted() {
    const n = this.$route.params
    shared
      .fetchData(
        `department?collage__university__university_name=${n.university}
    &collage_name=${n.collage}&name=${n.department}`
      )
      .then((res) => {
        this.soruce = res.results[0]
      })
  }
}
</script>
