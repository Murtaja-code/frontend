<template>
  <b-container class="border mt-2 rounded col-md-6 bgcolor">
    <b-form @submit.prevent="login" class="text">
      <span v-if="fail">
        <b-alert show variant="danger" class="mt-1">
          <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
          أسم المستخدم او كلمة المرور غير صحيح.
        </b-alert>
      </span>
      <b-form-group
        id="input-group-1"
        label="أسم المستخدم:"
        label-for="input-1"
        class="mt-2"
      >
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            title="املأ ألحقل رجاءاً"
            oninvalid="setCustomValidity('املأ ألحقل رجاءاً')"
            oninput="setCustomValidity('')"
            required
            placeholder="ادخل الاسم"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group id="input-group-2" label="رمز المرور:" label-for="input-2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            title="املأ ألحقل رجاءاً"
            oninvalid="setCustomValidity('املأ ألحقل رجاءاً')"
            oninput="setCustomValidity('')"
            required
            placeholder="ادخل رمز المرور"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-button type="submit" variant="primary">تسجيل الدخول</b-button>
    </b-form>

    <hr class="col-sm-4 col-6" />
    <div align="center" class="mb-2">
      ليس لديك حساب مسبقاً؟
      <br />
      <b-link variant="primary" to="/register">أنشاء حساب</b-link>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      checkLogin: false,
      form: {
        password: '',
        name: ''
      }
    }
  },
  computed: mapState({
    fail: (state) => state.tokenModel.fail
  }),
  methods: {
    login() {
      this.$store
        .dispatch('tokenModel/getToken', {
          username: this.form.name,
          password: this.form.password
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.red {
  color: red;
}
.text {
  text-align: right;
}
.bgcolor {
  background-color: lightblue;
}
.input:focus {
  outline: none !important;
  border-color: rgb(219, 24, 24);
  box-shadow: 0 0 5px red;
}
</style>
