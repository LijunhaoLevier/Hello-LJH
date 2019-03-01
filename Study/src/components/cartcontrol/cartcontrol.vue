<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <transition name="inner-move">
          <span class="inner icon-remove_circle_outline"></span>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss">
$icon_width: 16px;

.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    width: $icon_width;
    height: $icon_width;
    transform: translate3d(0, 0, 0);
    transform: rotate(0deg);
    opacity: 1;
    &.move-enter-active, &.move-leave-active{
      transform: rotate(180deg);
      transition: all 0.5s linear;
    }
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
    }
    .inner {
      display: inline-block;
      width: $icon_width;
      height: $icon_width;
      line-height: $icon_width;
      color: rgb(0, 160, 220);
      background: url(jianhao.png);
      background-size: $icon_width $icon_width;
      /*transform: rotate(180deg);*/
      /*&.inner-move-enter-active, &.inner-move-leave-active {
        transition: all 1s linear;
      }
      &.inner-move-enter, &.inner-move-leave-active {
        transform: rotate(180deg);
      }*/
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    line-height: 16px;
    padding: 0 6px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
    /*background-color: green;*/
  }
  .cart-add {
    display: inline-block;
    width: $icon_width;
    height: $icon_width;
    line-height: $icon_width;
    font-size: 16px;
    color: rgb(0, 160, 220);
    background: url(jiahao.png);
    background-size: $icon_width $icon_width;
  }
}

</style>
