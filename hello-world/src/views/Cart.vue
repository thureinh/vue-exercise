<template>
	<div class="card shopping-cart">
        <div class="card-header bg-dark text-light">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            Shipping cart
            <router-link to="/exercise" class="btn btn-outline-info btn-sm pull-right">Continue shopping</router-link>
            <div class="clearfix"></div>
        </div>
        <div class="card-body">
                <!-- PRODUCT -->
                <div v-for="(item, index) in getItems" :key="index">
                    <CartCard :item="item" v-if="!destroy" @pricechange="changePrice" @delete="deleteItem"/>
                    <hr/>
                </div>
                <!-- END PRODUCT -->
            <div class="pull-right">
                <a href="" class="btn btn-outline-secondary pull-right">
                    Update shopping cart
                </a>
            </div>
        </div>
        <div class="card-footer">
            <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                <div class="row">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="coupon code">
                    </div>
                    <div class="col-6">
                        <input type="submit" class="btn btn-default" value="Use coupon">
                    </div>
                </div>
            </div>
            <div class="pull-right" style="margin: 10px">
                <a href="" class="btn btn-success pull-right">Checkout</a>
                <div class="pull-right" style="margin: 5px">
                    Total price: <b>${{price | addComma}}</b>
                </div>
            </div>
        </div>
    </div>	
</template>
<script>
    import CartCard from '@/components/CartCard.vue'
	export default{
        components: {
            CartCard
        },
        data() {
            return {
                price: this.total(),
                destroy: false
            }
        },
        mounted(){
        },
        computed: {
            getItems() {
                return this.$store.state.cart
            }
        },
        methods: {
            changePrice(newPrice) {
                this.price += newPrice
            },
            total() {
                return this.$store.state.cart.reduce((adder, item) => { return adder + item.item_price * item.qty }, 0)
            },
            deleteItem(id){
                this.$store.dispatch('deleteFromCart', id)
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
.quantity {
    float: left;
    margin-right: 15px;
    background-color: #eee;
    position: relative;
    width: 80px;
    overflow: hidden
}

.quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
}

.quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
}

.quantity .minus, .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-background-size: 6px 30px;
    -moz-background-size: 6px 30px;
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
}

.quantity .minus:hover, .quantity .plus:hover {
    background-color: #dad8da
}

.quantity .minus {
    bottom: 0
}
.shopping-cart {
    margin-top: 20px;
}	
</style>