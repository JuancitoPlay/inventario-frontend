<template>
  <table class="table table is-fullwidth table is-bordered is-hoverable table is-striped">
    <ArticleListTitle :titles="titles" />
    <ArticleListBody @newToEdit="handleNewToEdit" @newToSee="handleNewToSee" :body="body"/>
  </table>
</template>

<script>
import ArticleListTitle from '@/components/article/list-title.vue'
import ArticleListBody from '@/components/article/list-body.vue'
export default {
  name: 'ArticleList',
  props: ['titles', 'body'],
  components: {
    ArticleListTitle,
    ArticleListBody
  },
  methods: {
    handleNewToEdit (article) {
      this.$emit('newToEdit', article)
    },
    handleNewToSee (article) {
      this.$emit('newToSee', article)
    }
  }
}
</script>

<style scoped>

</style>
