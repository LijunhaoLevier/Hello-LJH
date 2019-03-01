<template>
  <div class="seller" ref="sellerWrapper">
    <div class="content-wrapper">
      <div class="overview">
        <div class="overview-top">
          <h1 class="title">粥品香坊(大运村)</h1>
          <div class="score">
            <star :size="36" :score="seller.score"></star>
            <span class="number">(661)</span>
            <span class="count">月售690单</span>
          </div>
          <div class="collect" @click="collectSeller">
            <span class="icon" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="overview-bottom">
          <div class="delivery-info">
            <span class="title">起送价</span>
            <h1 class="number">{{seller.minPrice}}<span class="text">元</span></h1>
          </div>
          <div class="delivery-info">
            <span class="title">商家配送</span>
            <h1 class="number">{{seller.deliveryPrice}}<span class="text">元</span></h1>
          </div>
          <div class="delivery-info none">
            <span class="title">平均配送时间</span>
            <h1 class="number">39<span class="text">元</span></h1>
          </div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <div class="sign-wrapper">
        <ul>
          <li class="sign" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="Info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="text" v-for="(item, index) in seller.infos" :key="index">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star.vue'
import {saveToLocal, loadFromLocal} from '../../common/js/store.js'
import split from '../split/split.vue'
import BScroll from 'better-scroll'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        console.log('favorite')
        return loadFromLocal(this.seller.name, 'favorite', false)
      })()
    }
  },
  created () {
    console.log('created')
    this._initScroll()
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller' () {
      console.log('watch-seller')
      this._initPics()
    }
  },
  methods: {
    getData () {
      this.$http.get('static/data/data.json').then((response) => {
        response = response.data
        if (response) {
          this.seller = response.seller
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.sellerWrapper, {
              click: true
            })
          })
        }
      })
    },
    collectSeller (event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.name, 'favorite', this.favorite)
    },
    _initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
        this._initPics()
      })
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  },
  computed: {
    favoriteText () {
      console.log('favoriteText重新计算')
      console.log(this.favorite)
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style lang="scss">
$border_color : rgba(7, 17, 27, 0.1);
$font_color : rgb(7, 17, 27);

.seller {
	position: absolute;
	width: 100%;
	left: 0;
	top: 174px;
	bottom: 0px;
	overflow: hidden;
  .content-wrapper {
    .overview {
      padding: 18px;
      .overview-top {
        position: relative;
        font-size: 0;
        border-bottom: $border_color solid 1px;
        .title {
          font-size: 14px;
          color: $font_color;
          line-height: 14px;
          margin-bottom: 8px;
        }
        .score {
          position: relative;
          line-height: 18px;
          .star {
            display: inline-block;
            vertical-align: top;
          }
          .number {
            display: inline-block;
            font-size: 10px;
            color: rgb(77, 85, 93);
            margin: 0 12px 0 8px;
            vertical-align: top;
          }
          .count {
            display: inline-block;
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
        .collect {
          position: absolute;
          width: 36px;
          right: 0;
          top: 0;
          text-align: center;
          .icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-bottom: 4px;
            background: url(iconImg/UnShouCang.png) no-repeat;
            background-size: 18px 18px;
           &.active {
            background: url(iconImg/shoucang.png);
            background-size: 18px 18px;
           }
          }
          .text {
            display: block;
            font-size: 10px;
            line-height: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .overview-bottom {
        display: flex;
        padding: 18px 0 0 0;
        .delivery-info {
          flex: 1;
          text-align: center;
          font-size: 0;
          border-right: $border_color solid 1px;
          color: rgb(147, 153, 159);
          .title {
            font-size: 10px;
            line-height: 10px;
          }
          .number {
            font-size: 24px;
            margin-top: 4px;
            color: $font_color;
            line-height: 24px;
            font-weight: 200;
          }
          .text {
            font-size: 10px;
            font-weight: 200;
          }
        }
        .none {
          border-right: none;
        }
      }
    }
    .bulletin {
      padding: 18px 12px 0px 12px;
      .title {
        margin-bottom: 8px;
      }
      .content {
        padding-left: 12px;
        padding-bottom: 16px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        line-height: 24px;
        border-bottom: $border_color solid 1px;
      }
    }
    .sign-wrapper {
      padding: 0px 12px;
      .sign {
        padding: 16px 12px;
        border-top: $border_color solid 1px;
        font-size: 0;
        &:first-child {
          border-top: none;
        }
        .icon {
          width: 16px;
          height: 16px;
          display: inline-block;
          background-size: 16px 16px;
          vertical-align: top;
          background-color: red;
          margin-right: 6px;
          &.discount {
            background: url(iconImg/discount_4@2x.png);
            background-size: 16px 16px;
          }
          &.guarantee {
            background: url(iconImg/guarantee_4@2x.png);
            background-size: 16px 16px;
          }
          &.invoice {
            background: url(iconImg/invoice_4@2x.png);
            background-size: 16px 16px;
          }
          &.special {
            background: url(iconImg/special_4@2x.png);
            background-size: 16px 16px;
          }
          &.decrease {
            background: url(iconImg/decrease_4@2x.png);
            background-size: 16px 16px;
          }
        }
        .text {
          font-size: 12px;
          font-weight: 200;
          color: $font_color;
          line-height: 16px;
        }
      }
    }
    .pics {
      padding: 18px;
      font-size: 0;
      .title {
        margin-bottom: 12px;
        font-size: 14px;
        color: $font_color;
        line-height: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .Info {
      padding: 18px;
      font-size: 0;
      .title {
        line-height: 14px;
        font-size: 14px;
        color: $font_color;
        margin-bottom: 12px;
      }
      ul {
        .text {
          padding: 16px 12px;
          font-size: 12px;
          font-weight: 200;
          color: $font_color;
          line-height: 16px;
          border-top: $border_color solid 1px;
        }
      }
    }
  }
}
</style>
