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
						<input type="number" class="form-control text-center w-100" value="1">
					</div>
					<div class="col-lg-12 mt-3">
						<div class="row">
							<div class="col-lg-6 pb-2">
								<a href="#" class="btn btn-danger w-100">Add To Cart</a>
							</div>
							<div class="col-lg-6">
								<a href="#" class="btn btn-success w-100">Shop Now</a>
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
		filters: {
			commafy( num ) {
			    let str = num.toString().split('.');
			    if (str[0].length >= 5) {
			        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
			    }
			    if (str[1] && str[1].length >= 5) {
			        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
			    }
			    return str.join('.');
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