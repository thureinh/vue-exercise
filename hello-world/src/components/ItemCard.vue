<template>
	<div class="col-md-3">
		<div href="#" class="card card-product-grid">
			<a href="#" class="img-wrap"> <img :src="item.item_photo"> </a>
			<figcaption class="info-wrap">
				<router-link class="title" :to="'/item/' + item.item_id">{{item.item_name}}</router-link>				
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
			</figcaption>
		</div>
	</div> <!-- col.// -->
</template>
<script>
	export default{
		props: {
			item: Object,
			icon: null
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
<style scoped src="../assets/styles/ui.css"></style> 
<style scoped src="../assets/styles/responsive.css"></style> 