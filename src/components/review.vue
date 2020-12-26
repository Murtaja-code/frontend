<template>
  <div class="text-right mb-5 mt-0">
    <!-- let one edit text appear! -->
    <!-- username is used to control dots appearance -->
    <div
      class="border mt-2"
      v-for="(item, index) in soruce.results"
      :key="item.id"
    >
      <b-icon
        v-if="(username === item.username) & !edit[index][edits[index]]"
        @click="
          dot_info[index][dots_info[index]] = !dot_info[index][dots_info[index]]
        "
        icon="three-dots-vertical"
        class="dots-posit"
      ></b-icon>

      <b-button-group
        vertical
        @click="edit_text = item.review"
        v-if="dot_info[index][dots_info[index]] & !edit[index][edits[index]]"
        class="dots-posit"
      >
        <b-button
          size="sm"
          variant="info"
          @click="edit[index][edits[index]] = !edit[index][edits[index]]"
          >تعديل</b-button
        >
        <b-button
          size="sm"
          variant="danger"
          @click="deleteRview((comment_id = `/${item.id}/`))"
          >حذف</b-button
        >
      </b-button-group>
      <!-- <b-icon icon="file-earmark-person"></b-icon> -->
      <h6>
        <b-avatar size="sm"></b-avatar>
        {{ item.username }}
      </h6>
      <hr class="col-2 mr-2 mt-0 mb-0" />

      <p class="mr-2 mt-0" v-if="!edit[index][edits[index]]">
        {{ item.review }}
      </p>

      <b-form v-if="edit[index][edits[index]]" @submit.prevent="formSumbit">
        <b-form-textarea
          class="mt-1"
          id="textarea"
          v-model="edit_text"
          rows="2"
        ></b-form-textarea>
        <b-button
          variant="primary"
          :disabled="edit_text === ''"
          @click=";(method = 'PUT'), (comment_id = `/${item.id}/`)"
          class="btn-posit"
          type="submit"
          size="sm"
          >تعديل</b-button
        >
        <b-button
          variant="danger"
          @click="
            ;(edit[index][edits[index]] = !edit[index][edits[index]]),
              (dot_info[index][dots_info[index]] = !dot_info[index][
                dots_info[index]
              ])
          "
          class="btn-posit"
          size="sm"
          >ألغاء</b-button
        >
      </b-form>
    </div>
    <b-pagination
      class="mt-2"
      v-model="currentPage"
      :total-rows="soruce.count"
      per-page="5"
      prev-text="السابق"
      next-text="التالي"
      limit="5"
      align="center"
      size="sm"
      pills
      @input="fetchReview"
      hide-goto-end-buttons
      first-number
      last-number
    ></b-pagination>

    <b-form @submit.prevent="formSumbit">
      <label for="textarea"
        >أترك مراجعة:
        <!-- <strong> {{ arb_name }}:</strong> -->
      </label>
      <b-form-textarea
        @click="alert = true"
        class=" mb-1"
        id="textarea"
        v-model="text"
        placeholder="اكتب ..."
        rows="2"
      ></b-form-textarea>
      <b-popover
        target="textarea"
        placement="topleft"
        variant="info"
        v-if="!refresh"
      >
        يرجىء
        <b-button variant="outline-primary" size="sm" to="/login"
          >تسجل الدخول</b-button
        >
        أولا
      </b-popover>

      <b-button
        variant="primary"
        :disabled="refresh === false || text === ''"
        class="btn-posit"
        type="submit"
        >ارسال</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import shared from '../shared'

export default {
  data() {
    return {
      currentPage: 1,
      text: '',
      edit_text: '',
      alert: false,
      dots_info: [
        'dot_info1',
        'dot_info2',
        'dot_info3',
        'dot_info4',
        'dot_info5'
      ],
      dot_info: [
        { dot_info1: false },
        { dot_info2: false },
        { dot_info3: false },
        { dot_info4: false },
        { dot_info5: false }
      ],
      edits: ['edit1', 'edit2', 'edit3', 'edit4', 'edit5'],
      edit: [
        { edit1: false },
        { edit2: false },
        { edit3: false },
        { edit4: false },
        { edit5: false }
      ],
      method: 'POST',
      comment_id: '',
      soruce: ''
    }
  },
  props: {
    university_id: Number,
    sub_url: String,
    arb_name: String
  },
  computed: mapState({
    refresh: (state) => state.tokenModel.refresh,
    username: (state) => state.tokenModel.username
  }),
  methods: {
    fetchReview() {
      shared
        .fetchData(this.sub_url.concat(`?page=${this.currentPage}&page_size=5`))
        .then((res) => {
          this.soruce = res
        })
    },
    deleteRview() {
      shared
        .sendReviewRating({
          sub_url: this.sub_url,
          comment_id: this.comment_id,
          method: 'DELETE'
        })
        .then(() => {
          // if one comment in a page and the comment get deleted.
          //  the entire page will deleted, so it will throw an error('404' not found).
          // but still a problem here!
          this.currentPage = 1
          this.fetchReview()
        })
      // cos the one after the deleted item will appear
      for (let i = 0; i < 5; i++) {
        this.edit[i][this.edits[i]] = false
        this.dot_info[i][this.dots_info[i]] = false
      }
    },
    formSumbit() {
      if (this.method === 'PUT') {
        shared
          .sendReviewRating({
            review: this.edit_text,
            building: this.university_id,
            sub_url: this.sub_url,
            id: this.comment_id,
            method: this.method
          })
          .then(() => {
            this.fetchReview()
          })
      }
      // post request
      else {
        shared
          .sendReviewRating({
            review: this.text,
            // user: res.results[0].id,
            building: this.university_id,
            sub_url: this.sub_url,
            id: '',
            method: this.method
          })
          .then(() => {
            this.fetchReview()
          })
      }
      for (let i = 0; i < 5; i++) {
        this.edit[i][this.edits[i]] = false
        this.dot_info[i][this.dots_info[i]] = false
      }
      this.text = ''
    }
  },

  mounted() {
    this.fetchReview()
  }
}
</script>

<style lang="scss" scoped>
.btn-posit {
  float: left;
}
.dots-posit {
  float: left;
}
</style>
