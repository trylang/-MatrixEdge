<template>
  <div class="content">
    <h3 class="title">{{title}}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid #ccc;
}
.title {
  color: #333;
}
</style>




