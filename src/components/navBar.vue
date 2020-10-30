<template>
  <div dir="rtl">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">الرئيسية</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/news">الأخبار</b-nav-item>
          <b-nav-item to="/university">الجامعة</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="mr-auto">
          <b-nav-item-dropdown v-if="access" left>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item>الملف الشخصي</b-dropdown-item>
            <b-dropdown-item @click="logout">تسجيل الخروج</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!access" to="/login">تسجيل الدخول</b-nav-item>
          <b-nav-item v-if="!access" to="/register">انشاء حساب</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    // you may use a function too instead of mapstate, it would watch for changes too.
    access: (state) => state.tokenModel.access,
    username: (state) => state.tokenModel.username
  }),
  methods: {
    logout() {
      this.$store.dispatch('tokenModel/destroyToken')
      this.$router.push({ name: 'logIn' })
    }
  }
}
</script>
