<template>
	<div class="d-flex flex-column align-items-center justify-content-center">
	 	<div class="mt-5">
		   <div class="row">
		       <div class="spinner-border text-success mx-auto" style="width: 3rem; height: 3rem;" role="status">
		           <span class="sr-only">Loading...</span>
		       </div>
		    </div>
		    <div class="row">
		      <strong class="h2 text-info">{{text}}...</strong>
		    </div>
		</div>
	</div>	
</template>
<script>
	export default{
		props: {
			text: String
		}
	}
</script>
<style>
	
</style>