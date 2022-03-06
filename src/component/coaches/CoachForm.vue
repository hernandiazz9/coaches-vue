<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">Firstname</label>
      <input
        v-model.trim="firstName.val"
        @focus="clearValidity"
        type="text"
        id="firstName"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Lastname</label>
      <input
        v-model.trim="lastName.val"
        @focus="clearValidity"
        type="text"
        id="lastName"
      />
      <p v-if="!lastName.isValid">LastName must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        @focus="clearValidity"
        v-model.trim="description.val"
        id="description"
        row="5"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        v-model.number="rate.val"
        type="number"
        @focus="clearValidity"
        id="rate"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <label
          ><input
            @focus="clearValidity"
            v-model="areas.val"
            type="checkbox"
            id="areas"
            value="frontend"
          />Frontend Development</label
        >
      </div>
      <div>
        <label>
          <input
            @focus="clearValidity"
            v-model="areas.val"
            type="checkbox"
            id="areas"
            value="backend"
          />Backend Development</label
        >
      </div>
      <div>
        <label>
          <input
            @focus="clearValidity"
            v-model="areas.val"
            type="checkbox"
            id="areas"
            value="career"
          />Career Advisory</label
        >
      </div>
      <p v-if="!rate.isValid">At least 1 expertice must be selected</p>
    </div>
    <p v-if="!formIsValid" class="">
      Pleas fix the above errors and submit again
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  emits: ['save-data'],
  methods: {
    clearValidity(e) {
      this[e.target.id].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) return;
      console.log(this.firstName.val);
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
