<template>
	<Spinner v-if="loading" text="ခဏစောင့်"/>
	<div v-else class="wrap-table100 mt-4">
		<div class="table100">
			<table>
				<thead>
					<tr class="table100-head">
						<th class="column1">Order Serial</th>
						<th class="column2">Date</th>
						<th class="column3">Item Name</th>
						<th class="column4">Price</th>
						<th class="column5">Quantity</th>
						<th class="column6">Total</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(order) in orders">
						<template v-for="(item) in order.items">
							<tr :key="'tr-' + item.info.item_id">
								<td class="column1" :key="'td-' + item.info.item_id + '2'">
									{{order.voucher_no}}								
								</td>
								<td class="column2" :key="'td-' + item.info.item_id + '1'">
									{{order.order_date}}
								</td>
								<td class="column3" :key="'td-' + item.info.item_id + '4'">{{item.info.item_name}}</td>
								<td class="column4" :key="'td-' + item.info.item_id + '5'">{{item.info.item_price | commafy}}</td>
								<td class="column5" :key="'td-' + item.info.item_id + '6'">{{item.qty}}</td>
								<td class="column6" :key="'td-' + item.info.item_id + '7'">{{order.total | commafy}}</td>
							</tr>
						</template>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import ItemService from "@/services/item_service.js"
import Spinner from "@/components/Spinner.vue"
export default {
	components:{
		Spinner
	},
    data() {
      return {
      	loading: false,
      	orders: [],
      }
    },
    mounted() {
    	this.loading = true
    	this.getOrders()
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
    	getOrders(){
    		ItemService.getOrders()
    		.then(resp => { 
    			console.log(resp)
    			
    		})
    		.catch(error => { console.log(error) })
    		.finally(() => this.loading = false)
    	}
    }
  }
</script>
<style scoped src="../assets/vendor/animate/animate.css"></style>
<style scoped src="../assets/vendor/select2/select2.min.css"></style>
<style scoped src="../assets/vendor/perfect-scrollbar/perfect-scrollbar.css"></style>
<style scoped src="../assets/styles/util.css"></style>
<style scoped src="../assets/styles/main.css"></style>