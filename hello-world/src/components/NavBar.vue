<template>
	<b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/testing">Testing</b-nav-item>
          <b-nav-item to="/exercise">Exercise</b-nav-item>
          <b-nav-item v-if="isLoggedIn" to="/orders">Orders</b-nav-item>
          <b-nav-item to="/cart">
          		<font-awesome-icon :icon="['fas', 'shopping-cart']"/>&nbsp;Cart<b-badge variant="info">{{cartCount}}</b-badge>
          </b-nav-item>
          <template v-if="!isLoggedIn">
          	<b-nav-item to="/login">Login</b-nav-item>
          	<b-nav-item to="/register">Register</b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown v-if="isLoggedIn" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <strong class="text-dark">{{ authUser.name | getFirstName }}</strong>&nbsp;<b-avatar variant="dark"></b-avatar>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>	
</template>
<script>
export default{
methods:{
  logout(){
  	this.$session.start()
  	this.$session.remove('user')
    this.$store.dispatch('logout')
    this.$session.start()
    this.$session.remove('user')
    this.$router.push('/login')
  }
},
computed: {
  cartCount() {
    this.$store.dispatch('getData')
    return this.$store.state.cart.length
  },
  isLoggedIn() { 
    return this.$store.getters.isLoggedIn
  },
  authUser(){
  	this.$session.start()
    return this.$session.get('user')
  },
},
filters: {
  getFirstName(fullname){
  	return fullname.split(' ')[0]
  }
}
}
</script>