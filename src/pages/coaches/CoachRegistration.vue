<template>
  <section>
    <base-card>
      <h2>Register as a Coach</h2>
      <coach-registration @save-data="saveData"></coach-registration>
    </base-card>
  </section>
</template>

<script>
import CoachRegistration from '../../component/coaches/CoachForm.vue';
export default {
  components: { CoachRegistration },
  
  methods: {
    saveData(dataForm) {
      this.$store.dispatch('coaches/registerCoach', dataForm);
      this.$router.replace('/');
    },
  },
};
</script>

<style></style>
