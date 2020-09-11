<template>
	<router-link class="col-md-3" :to="{ name: 'item-detail', params: { id: item.item_id }}">
		<div href="#" class="card card-product-grid">
			<a href="#" class="img-wrap"> <img :src="item.item_photo"> </a>
			<figcaption class="info-wrap">
				<router-link class="title" :to="'item/' + item.item_id">{{item.item_name}}</router-link>				
				<div class="rating-wrap">
					<ul class="rating-stars">
						<li style="width:80%" class="stars-active"> 
							<font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/>
							<font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/>
						</li>
						<li>
							<font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/>
							<font-awesome-icon :icon="icon"/><font-awesome-icon :icon="icon"/> 
						</li>
					</ul>
					<span class="label-rating text-muted"> 34 reviews</span>
				</div>
				<div class="price mt-1">${{item.item_price | commafy}}</div> <!-- price-wrap.// -->
				<div class="row mt-3">
					<div class="col">
  						<b-button pill :to="{ name: 'item-detail', params: { id: item.item_id }}" variant="info"><font-awesome-icon :icon="['fas', 'info-circle']"/>&nbsp;Detail</b-button>
  					</div>
					<div class="col">
						<b-button @click="addToCart($event)" pill variant="warning"><font-awesome-icon :icon="['fas', 'shopping-cart']"/>&nbsp;Add</b-button>
					</div>
				</div>
			</figcaption>
		</div>
	</router-link> <!-- col.// -->
</template>
<script>
	import swal from 'sweetalert'
	export default{
		props: {
			item: Object,
			icon: null
		},
		data: function(){
				return {
					getItem: this.item
				}
			},
		filters: {
			commafy( myString ) {
                let objRegex  = new RegExp('(-?[0-9]+)([0-9]{3})');                        
                //Check For Criteria....           
                while(objRegex.test(myString))           
                {           
                    //Add Commas After Every Three Digits Of Number...           
                    myString = myString.toString().replace(objRegex, '$1,$2');           
                } 
                return myString
			}
		},
		methods: {
			addToCart(event) {
				if(event)
					event.preventDefault()
				swal("Added To Cart!", "You can increase quantity quickly in detail page", "success")
				let item = {...this.getItem, qty: 1}
				this.$store.dispatch('addToCart', item)
			}
		}
	}
</script>
<style scoped src="../assets/styles/ui.css"></style> 
<style scoped src="../assets/styles/responsive.css"></style> 