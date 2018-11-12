<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newAdmin from './newAdmin'
import adminDashboard from './admin'
import scientistDashboard from './scientist'

export default {
  name: 'Dashboard',
  components: { adminDashboard, scientistDashboard, newAdmin },
  data() {
    return {
      currentRole: 'newAdmin'
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    if (this.user.user.role === 2) {
      this.currentRole = 'scientistDashboard'
    }
  }
}
</script>
