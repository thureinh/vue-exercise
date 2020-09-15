<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="sortDirection"
            id="initialSortSelect"
            size="sm"
            :options="['asc', 'desc', 'last']"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="voucher_no">Voucher Number</b-form-checkbox>
            <b-form-checkbox value="order_date">Order Date</b-form-checkbox>
            <b-form-checkbox value="status">Status</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :busy="loading"
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :bordered="bordered"
      @filtered="onFiltered"
    >
      <template v-slot:table-busy>
        <Spinner text="ခဏစောင့်"/>
      </template>
      <template v-slot:cell(voucher_number)="row">
        <p><strong>{{ row.value }}</strong></p>
      </template>
      <template v-slot:cell(status)="row">
        <b-badge v-if="row.value === 'pending'" pill variant="warning">Pending</b-badge>
        <b-badge v-if="row.value === 'delivering'" pill variant="info">Delivering</b-badge>
        <b-badge v-if="row.value === 'delivered'" pill variant="success">Delivered</b-badge>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button variant="primary" size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card v-for="(item, index) in row.item.orderitems" :key="index">
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Item Name :</b></b-col>
            <b-col>{{ item.item_name }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Item Price :</b></b-col>
            <b-col>${{ item.item_price | commafy }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Item Quantity :</b></b-col>
            <b-col>{{ item.item_qty }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>SubTotal :</b></b-col>
            <b-col>${{ item.item_price * item.item_qty | commafy }}</b-col>
          </b-row>          
        </b-card>
        <b-row>
          <b-col sm="3" class="text-sm-right"><b>Total :</b></b-col>
          <b-col>${{ row.item.total | commafy }}</b-col>
        </b-row>
        <b-button variant="primary" size="sm" @click="row.toggleDetails">Hide Details</b-button>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal size="lg" :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <Bill :data="infoModal.content"/>
    </b-modal>
  </b-container>
</template>
<script>
import ItemService from "@/services/item_service.js"
import Spinner from "@/components/Spinner.vue"
import Bill from "@/components/Bill.vue"
export default {
	components:{
		Spinner,
    Bill
	},
data() {
    return {
      loading: false,
      items: [],
      fields: [
        { key: 'voucher_number', label: 'Voucher Number', sortable: true, sortDirection: 'desc' },
        { key: 'order_date', label: 'Order Date', sortable: true, class: 'text-center' },
        {
          key: 'status',
          label: 'Status',
          formatter: (value) => {
            let element = ''
            switch(value) {
              case 0:
                element = 'pending'
                break;
              case 1:
                element = 'delivering'
                break;
              case 2:
                element = 'delivered'
                break;
              default:
                // code block
            }
            return element
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 5,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      bordered: true,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted() {
  	this.loading = true
  	this.getOrders()
    this.totalRows = this.items.length
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
        this.items = resp.data.orders.map(function (order)  { 
          return { 
            voucher_number: order.voucher_no, 
            order_date: order.order_date,
            status: order.status,
            orderitems: order.items,
            total: order.total
          }
        })
        this.totalRows = this.items.length  			
  		})
  		.catch(error => { console.log(error) })
  		.finally(() => this.loading = false)
  	},
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }  
  }
}
</script>
<style></style>