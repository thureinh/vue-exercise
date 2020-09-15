<template>
  <div class="col-6 offset-3">
    <b-alert class="mt-3" v-if="errors.length !== 0" show variant="danger">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{error}}</li>
      </ul>
    </b-alert>
    <h2 class="my-4"><u>Register Form</u></h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-0" label="Your Name:" label-for="input-0">
        <b-form-input
          id="input-0"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email address"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="text-password">
        <b-input type="password" id="text-password" aria-describedby="password-help-block" v-model="form.password"></b-input>
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </b-form-text>
      </b-form-group>

      <b-form-group id="input-group-3" label="Confirm Password" label-for="confirm-password">
        <b-input type="password" id="confirm-password" aria-describedby="password-help-block" v-model="form.password_confirmation"></b-input>
      </b-form-group>
      <b-form-row>
        <b-col>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
        <b-col>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </div>
</template>
<script>
  import ItemService from '@/services/item_service.js'
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        show: true,
        errors: []
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        ItemService.registerUser(this.form)
        .then(resp => {
          if(resp.data.errors){
            this.errors = resp.data.errors
          }
          else
          {
            this.$router.push({ path: '/login'})  
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        this.password_confirmation = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>