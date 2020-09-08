<template>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-2 text-center">
                <img class="img-responsive" :src="item.item_photo" alt="prewiew" width="120" height="80">
        </div>
        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
            <h4 class="product-name"><strong>{{item.item_name}}</strong></h4>
            <h4>
                <small>{{item.item_description}}</small>
            </h4>
        </div>
        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                <h6><strong>${{item.item_price | addComma}}&nbsp;<span class="text-muted">x</span></strong></h6>
            </div>
            <div class="col-4 col-sm-4 col-md-4">
                <div class="quantity">
                    <input type="button" value="+" @click="quantity++" class="plus">
                    <input type="number" step="1" max="99" min="1" v-model="quantity" title="Qty" class="qty"
                           size="4">
                    <input type="button" value="-" @click="(quantity !== 0) ? quantity-- : quantity" class="minus">
                </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 text-right">
                <button type="button" @click="destroy" class="btn btn-outline-danger btn-xs">
                    <font-awesome-icon :icon="['fas', 'trash']"/>
                </button>
            </div>
        </div>
    	<div class="col-3 offset-9">
    		<p class="text-center font-weight-bold">Individual Price : ${{currentprice | addComma}}</p>
    	</div>
    </div>
</template>
<script>
	export default{
		props: {
			item: Object
		},
		data() {
			return {
				quantity: this.item.qty
			}
		},
		computed: {
			currentprice(){
				return this.item.item_price * this.quantity
			}
		},
		watch: {
		    quantity: function (newQuantity, oldQuantity) {
		    	let result = newQuantity - oldQuantity
	    		this.sendToParent(result * this.item.item_price)
		    }
		},
		methods: {
			sendToParent(price){
				this.$emit('pricechange', price)
			},
			destroy(){
				this.$emit('delete', this.item.item_id)
			}
		},
		filters: {
			addComma(myString)           
		        {           
	                let objRegex  = new RegExp('(-?[0-9]+)([0-9]{3})');                        
	                //Check For Criteria....           
	                while(objRegex.test(myString))           
	                {           
                        //Add Commas After Every Three Digits Of Number...           
                        myString = myString.toString().replace(objRegex, '$1,$2');           
	                } 
	                return myString
		        }
		}
	}
</script>
<style>
	
</style>