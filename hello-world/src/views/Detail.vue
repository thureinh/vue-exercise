<template>
	<div>
		<Spinner text="ခဏစောင့်" v-if="loading"/>
		<ItemDetail :item="item" v-else/>
	</div>
</template>
<script>
import ItemService from '@/services/item_service.js'
import ItemDetail from '@/components/ItemDetail.vue'
import Spinner from '@/components/Spinner.vue'
export default{
	data (){
	  return {
	    item: null,
	  	loading: true,
	  	errored: false,
	  }
	},
    mounted(){
      this.getItem()
    },
	components: {
		ItemDetail,
		Spinner
	},
	methods: {
		getItem(){
			ItemService.getItem(this.$route.params.id)
            .then(res => {
              this.item = res.data.item
            })
            .catch(err => {
              console.log('There was an error:',err.response)
              this.errored = true
            })
            .finally(() => this.loading = false)
		}
	},
}
</script>
<style>

</style>