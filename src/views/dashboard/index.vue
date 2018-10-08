<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import scientistDashboard from './scientist'

export default {
  name: 'Dashboard',
  components: { adminDashboard, scientistDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    console.log('this.user.user.role', this.user.user.role)
    if (!this.user.user.role === 2) {
      this.currentRole = 'scientistDashboard'
    }
  }
}
</script>
