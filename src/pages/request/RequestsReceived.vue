<template>
  <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="req in recivedRequests"
          :email="req.userEmail"
          :message="req.message"
          :key="req.id"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any Request</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../component/request/RequestItem.vue';
export default {
  components: { RequestItem },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadRequest() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('request/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    recivedRequests() {
      console.log(this.$store.getters['request/requests']);
      return this.$store.getters['request/requests'];
    },
    hasRequests() {
      return this.$store.getters['request/hasRequests'];
    },
  },
  created() {
    this.loadRequest();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
