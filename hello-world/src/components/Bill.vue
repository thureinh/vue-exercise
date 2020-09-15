<template>
	<div class="row d-flex justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="text-left logo p-2 px-5"> <img src="https://i.imgur.com/2zDU056.png" width="50"> </div>
                <div class="invoice p-5">
                    <h5>Your order Confirmed!</h5> <span class="font-weight-bold d-block mt-4">Hello, {{authUser.name}}</span> <span>You order has been confirmed and will be shipped in next two days!</span>
                    <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="py-2"> <span class="d-block text-muted">Order Date</span> <span>{{objData.order_date}}</span> </div>
                                    </td>
                                    <td>
                                        <div class="py-2"> <span class="d-block text-muted">Order No</span> <span>{{objData.voucher_number}}</span> </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="product border-bottom table-responsive">
                        <table class="table table-borderless">
                            <tbody>
                                <tr v-for="(item, index) in objData.orderitems" :key="index">
                                    <td width="20%"> <img :src="item.item_photo" width="90"> </td>
                                    <td width="60%"> <span class="font-weight-bold">{{item.item_name}}</span>
                                        <div class="product-qty"> <span class="d-block text-dark">Quantity : {{item.item_qty}}</span> <span class="d-block text-dark">SubCategory : {{item.subcategory.subcategory_name}}</span><span class="text-dark">Brand : {{item.brand.brand_name}}</span> </div>
                                    </td>
                                    <td width="20%">
                                        <div class="text-right"> <span class="font-weight-bold">$67.50</span> </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row d-flex justify-content-end">
                        <div class="col-md-5">
                            <table class="table table-borderless">
                                <tbody class="totals">
                                    <tr>
                                        <td>
                                            <div class="text-left"> <span class="text-muted">Subtotal</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span>${{objData.total | commafy}}</span> </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="text-left"> <span class="text-muted">Discount</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span class="text-success">${{ discount | toFixed | commafy }}</span> </div>
                                        </td>
                                    </tr>
                                    <tr class="border-top border-bottom">
                                        <td>
                                            <div class="text-left"> <span class="font-weight-bold">Subtotal</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span class="font-weight-bold">${{ truePrice | toFixed | commafy }}</span> </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p>We will be sending shipping confirmation email when the item shipped successfully!</p>
                    <p class="font-weight-bold mb-0">Thanks for shopping with us!</p> <span>Admin Team</span>
                </div>
                <div class="d-flex justify-content-between footer p-3"> <span>Need Help? visit our <a href="#"> help center</a></span>  </div>
            </div>
        </div>
    </div>	
</template>
<script>
export default {
	data() {
		return {
			objData: {}
		}
	},
	props: {
		data: String
	},
	created(){
		this.objData = JSON.parse(this.data)
	},
	computed: {
		authUser(){
	  		this.$session.start()
	    	return this.$session.get('user')
	  	},
	  	discount(){
	  		let returnValue = 0
	  		if(this.objData.orderitems.length > 1)
	  		{
	  			returnValue = this.objData.orderitems.reduce(function (accumulator, item) {
	  							return ((accumulator.item_discount / 100) * accumulator.item_price) + ((item.item_discount / 100) * item.item_price)})
	  		}
	  		else
	  		{
	  			returnValue = (this.objData.orderitems[0].item_discount / 100) * this.objData.orderitems[0].item_price
	  		}
	  		return  returnValue
	  	},
	  	truePrice(){
	  		return this.objData.total - this.discount
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
		},
		toFixed(str){
			return Number(str).toFixed(2)
		}
	}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
body {
    background-color: #ffe8d2;
    font-family: 'Montserrat', sans-serif
}

.card {
    border: none
}

.logo {
    background-color: #eeeeeea8
}

.totals tr td {
    font-size: 13px
}

.footer {
    background-color: #eeeeeea8
}

.footer span {
    font-size: 12px
}

.product-qty span {
    font-size: 12px;
    color: #dedbdb
}
</style>