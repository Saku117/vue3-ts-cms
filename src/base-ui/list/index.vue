<template>
  <!-- 最底层的可视区容器 -->
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent()">
    <!-- 中间的可滚动区域，z-index=-1，高度和真实列表相同，目的是出现相同的滚动条 -->
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <!-- 最上层的可视区列表，数据和偏移距离随着滚动距离的变化而变化 -->
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px' }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, withDefaults, onMounted } from "vue"
import type { RefComponent } from "@/interface/commonType"

const listRef = ref<RefComponent<HTMLElement>>(null)
const screenHeight = ref(0) //可视区域大小
const startOffset = ref(0) //偏移距离
const start = ref(0) //起始索引
const end = ref(0) //结束索引

const props = withDefaults(
  defineProps<{
    items: any[]
    itemSize: number
  }>(),
  {
    items: () => [],
    itemSize: 50
  }
)
//可视区域的项数
const visibleCount = computed(() =>
  Math.ceil(screenHeight.value / props.itemSize)
)
//列表总高度
const listHeight = computed(() => props.items.length * props.itemSize)
//可视区列表偏移距离对应的样式
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`)
//获取可视区列表数据
const visibleData = computed(() =>
  props.items.slice(start.value, Math.min(end.value, props.items.length))
)

onMounted(() => {
  screenHeight.value = listRef.value?.clientHeight as number
  start.value = 0
  end.value = start.value + visibleCount.value
})

const scrollEvent = () => {
  let scrollTop = listRef.value?.scrollTop as number
  start.value = Math.floor(scrollTop / props.itemSize)
  end.value = start.value + visibleCount.value
  startOffset.value = scrollTop - (scrollTop % props.itemSize)
}
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.infinite-list-item {
  line-height: 50px;
  text-align: center;
  color: #555;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
