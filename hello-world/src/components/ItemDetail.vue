<template>
	<div class="row mt-5">
		<div class="col-lg-4 left-side-product-box pb-3">
			<img :src="item.item_photo" class="border p-3">
		</div>
		<div class="col-lg-8">
			<div class="right-side-pro-detail border p-3 m-0">
				<div class="row">
					<div class="col-lg-12">
						<span>Who What Wear</span>
						<p class="m-0 p-0">{{item.item_name}}</p>
					</div>
					<div class="col-lg-12">
						<p class="m-0 p-0 price-pro">${{item.item_price | commafy}}</p>
						<hr class="p-0 m-0">
					</div>
					<div class="col-lg-12 pt-2">
						<h5>Product Detail</h5>
						<span>{{item.item_description}}</span><hr class="m-0 pt-2 mt-2">
					</div>
					<div class="col-lg-12">
						<p class="tag-section"><strong>Tag : </strong><a href="">Woman</a><a href="">,Man</a></p>
					</div>
					<div class="col-lg-12">
						<h6>Quantity :</h6>
						<input type="number" v-model.number="quantity" class="form-control text-center w-100" value="1" min="1">
					</div>
					<div class="col-lg-12 mt-3">
						<div class="row">
							<div class="col-lg-6 pb-2">
								<a href="#" @click="addToCart($event)" class="btn btn-danger w-100">Add To Cart</a>
							</div>
							<div class="col-lg-6">
								<b-link :to="{name: 'exercise'}" class="btn btn-success w-100">Shop Now</b-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props: {
			item: Object
		},
		data: function (){
			return {
				getItem: this.item,
				quantity: 1
			}
		},
		methods: {
			addToCart(event) {
				if(event)
					event.preventDefault()
				this.$store.dispatch('addToCart', {...this.getItem, qty: this.quantity})
				this.$router.push({path: '/cart'})
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
	}	
</script>
<style scoped>
body{
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #f5f5f5
}
.hedding{
	font-size: 20px;
	color:#ab8181`;
}
.main-section{
	position: absolute;
	left:50%;
	right:50%;
	transform: translate(-50%,5%);
}
.left-side-product-box img{
	width: 100%;
}
.left-side-product-box .sub-img img{
	margin-top:5px;
	width:83px;
	height:100px;
}
.right-side-pro-detail span{
	font-size:15px;
}
.right-side-pro-detail p{
	font-size:25px;
	color:#a1a1a1;
}
.right-side-pro-detail .price-pro{
	color:#E45641;
}
.right-side-pro-detail .tag-section{
	font-size:18px;
	color:#5D4C46;
}
.pro-box-section .pro-box img{
	width: 100%;
	height:200px;
}
@media (min-width:360px) and (max-width:640px) {
	.pro-box-section .pro-box img{
		height:auto;
	}
}
</style>