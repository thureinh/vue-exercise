<template>
	<div>
		<section class="section-content">
		<div class="container">

		<header class="section-heading">
			<h1 class="section-title my-3">Popular products</h1>
		</header><!-- sect-heading -->
		<div class="d-flex flex-column align-items-center justify-content-center" v-if="loading">
			<Spinner/>
		</div>
		<div class="row" v-else>
			<ItemCard v-for="(item, index) in items" :icon="star" :item="item" :key="index"/>
		</div> <!-- row.// -->
		</div> <!-- container .//  -->
		</section>
	</div>
</template>
<script>
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ItemCard from '@/components/ItemCard.vue'
import ItemService from '@/services/item_service.js'
import Spinner from '@/components/Spinner.vue'
export default {
	name: 'Exercise',
	props: {
		msg: String
	},
	components: {
		ItemCard,
		Spinner
	},
	data (){
      return {
        items: [],
      	loading: true,
      	errored: false,
      	star: faStar,
      }
    },
	computed: {
	},
    mounted(){
      this.getItems()
    },
    methods:{
      	getItems(){
	        ItemService.getItems()
	            .then(res => {
	              this.items = res.data.items
	            })
	            .catch(err => {
	              console.log('There was an error:',err.response)
	              this.errored = true
	            })
	            .finally(() => this.loading = false)
      	}
    }
}
</script>
<style></style>