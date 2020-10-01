<template>
  <div v-on:click.prevent="onClick">
    这里是首页
  </div>
</template>

<script>

export default {
  name: 'Index',
  methods: {
    onClick () {
      console.log('~~~~ click index ~~~')
    }
  }
}
</script>
