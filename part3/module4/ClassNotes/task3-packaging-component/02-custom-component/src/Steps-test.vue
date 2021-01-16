<template>
  <div>
    <Steps :count="count" :active="active"></Steps>
    <button @click="next">next</button>
  </div>
</template>

<script>
import Steps from './Steps.vue';

export default {
  data() {
    return {
      active: 0,
      count: 4,
    }
  },
  components: {
    Steps,
  },
  methods: {
    next(){
      if(this.active >= 4){
        this.active = 0;
      }
      this.active++
    }
  }

};
</script>

<style>
</style>