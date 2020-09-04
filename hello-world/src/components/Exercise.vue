<template>
	<div>
		<h1 class="text-danger">{{title}}</h1>
	</div>
</template>
<script>
export default {
	name: 'Exercise',
	props: {
		msg: String
	},
	data (){
      return {
        title: 'Exercise Vue'
      }
    }
}
</script>
<style>
	
</style>