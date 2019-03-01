<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :class="itemClass" :key='index'></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let integer = Math.floor(this.score)
      let hasDecimal = this.score % 1 !== 0
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  created () {
  }
}

</script>

<style lang="scss">
$icon_width_36: 15px;

.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background: url(star_img/star48_on@2x.png);
        background-size: 20px 20px;
      }
      &.half {
        background: url(star_img/star48_half@2x.png);
        background-size: 20px 20px;
      }
      &.off {
        background: url(star_img/star48_off@2x.png);
        background-size: 20px 20px;
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 3px;
      background-size: $icon_width_36 $icon_width_36;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background: url(star_img/star36_on@2x.png);
        background-size: $icon_width_36 $icon_width_36;
      }
      &.half {
        background: url(star_img/star36_half@2x.png);
        background-size: $icon_width_36 $icon_width_36;
      }
      &.off {
        background: url(star_img/star36_off@2x.png);
        background-size: $icon_width_36 $icon_width_36;
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background: url(star_img/star24_on@2x.png);
        background-size: 10px 10px;
      }
      &.half {
        background: url(star_img/star24_half@2x.png);
        background-size: 10px 10px;
      }
      &.off {
        background: url(star_img/star24_off@2x.png);
        background-size: 10px 10px;
      }
    }
  }
}
</style>
