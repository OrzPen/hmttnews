<template>
    <div>
        {{$route.params.queryText}}
    </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      searchData: [],
      page: 1,
      per_page: 10
    }
  },
  created () {
    this.loadSearch()
    // console.log(this.$route.params.queryText)
  },
  computed: {
    q () {
      return this.$route.params.queryText
    }
  },
  methods: {
    async loadSearch () {
      const data = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      console.log(data)

      return data
    }
  }
}

</script>

<style>

</style>
