<template>
  <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section><coach-filter @change-filter="setFilter"></coach-filter></section>
  <section>
    <base-card>
      <div class="controls">
        <base-button @click="loadCoaches(true)" mode="outline"
          >Refresh</base-button
        >
        <base-button link to="/auth?redirect=register" v-if="!isLogin">Login to register as a coach</base-button>
        <base-button
          v-if="isLogin && !isCoach && !isLoading"
          link
          to="/register"
          >Register as a coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          :id="coach.id"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
          :lastName="coach.lastName"
          :firstName="coach.firstName"
          v-for="coach in filteredCoaches"
          :key="coach.id"
        ></coach-item>
      </ul>
      <h3 v-else>No Coaches found. please create one</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../component/coaches/CoachItem.vue';
import CoachFilter from '../../component/coaches/CoachFilter.vue';
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      error: null,
      isLoading: false,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilters) {
      this.filters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', { force: refresh });
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isAuth;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes('frontend'))
          return true;
        if (this.filters.backend && coach.areas.includes('backend'))
          return true;
        if (this.filters.career && coach.areas.includes('career')) return true;
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
