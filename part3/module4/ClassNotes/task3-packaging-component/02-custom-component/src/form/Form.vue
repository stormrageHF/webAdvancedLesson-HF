<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "LgForm",
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide(){
    return {
      form: this
    }
  },
  methods:{
    validate(cb){
      const tasks = this.$children.filter(child => child.prop).map(child => child.validator())
      // console.log(tasks);
      Promise.all(tasks).then(()=> cb(true)).catch(()=> cb(false))
    }
  }
};
</script>

<style>
</style>