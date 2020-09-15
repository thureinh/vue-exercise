<template>
  <div class="col-6 offset-3">
    <b-alert class="mt-3" v-if="errMsg !== ''" show variant="danger">
        {{errMsg}}
    </b-alert>
    <h2 class="my-4"><u>Login Form</u></h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

      <b-form-group id="input-group-4" label="Password" label-for="input-4">
        <b-input type="password" id="text-password" aria-describedby="password-help-block" v-model="form.password"></b-input>
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </b-form-text>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Remember Me</b-form-checkbox>
        </b-form-checkbox-group>
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
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          checked: []
        },
        show: true,
        errMsg: ''
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        let user = {name: this.form.email, password: this.form.password}
        this.$store.dispatch('login',user)
          .then(() =>
          {
            this.$store.dispatch('getUser').then((resp) => {
              this.$session.start()
              this.$session.set('user', resp.data)
              this.$router.push('/orders')
            })
            .catch(err => {
                console.log('There was an error:',err.response)
            })
          })
          .catch(() => {
              this.errMsg = 'Login Failed!, Incorrect Email and Password'
          });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>