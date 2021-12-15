import { defineComponent, ref } from "vue"
import type { PropType } from "vue"
import type { Size, Type } from "./interface"
const buttonProps = {
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  size: String as PropType<Size>,
  ghost: Boolean,
  round: Boolean,
  secondary: Boolean,
  tertiary: Boolean,
  quaternary: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "button"
  },
  type: {
    type: String as PropType<Type>,
    default: "default"
  },
  dashed: Boolean,
  iconPlacement: {
    type: String as PropType<"left" | "right">,
    default: "left"
  },
  attrType: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button"
  },
  // onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  bordered: {
    type: Boolean,
    default: true
  }
} as const

const Button = defineComponent({
  name: "Button",
  props: buttonProps,
  setup(props) {
    const selfRef = ref<HTMLElement | null>(null)

    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        
      }
    }
  },
  render() {
    const { $slots, tag: Component } = this
    return <Component ref="selfRef"></Component>
  }
})
