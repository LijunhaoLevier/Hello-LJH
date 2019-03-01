<template>
	<div id="app">
		<v-header :seller="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
        <router-link to="goods">商品</router-link>
			</div>
			<div class="tab-item">
        <router-link :to="{path:'/ratings', query: {seller:seller}}">评价</router-link>
			</div>
			<div class="tab-item">
        <router-link to="seller">商家</router-link>
			</div>
		</div>
		<keep-alive>
      <router-view :seller="seller" keep-alive/>
		</keep-alive>
	</div>
</template>

<script>
import header from './components/header/header.vue'

export default {
  name: 'App',
  data () {
    return {
      seller: {
        type: Object
      }
    }
  },
  components: {
    'v-header': header
  },
  created () {
    this.$http.get('static/data/data.json').then(response => {
      response = response.body
      if (response) {
        this.seller = response.seller
      }
    }, response => {
      alert('请求数据失败')
    })
  }
}
</script>

<style lang="scss">
.tab {
	display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: rgba(7, 17, 27, 0.1) solid 1px;
  box-sizing: border-box;
  .tab-item {
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      text-decoration: none;
      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
