import { CSSProperties, FunctionalComponent } from "vue"

interface IProps {
  count: number
  style: CSSProperties
}

type IEmit = {
  childClick: () => void
}

const Child: FunctionalComponent<IProps, IEmit> = (props, ctx) => {
  const { count, ...rest } = props
  const { slots, emit } = ctx

  return (
    <div {...rest}>
      <h1>This is Child</h1>
      {slots?.header && slots.header()}
      <button onClick={() => emit("childClick")}>Child Count++</button>
      <p>Child count is : {count}</p>
      {slots?.default && slots.default()}
      <p>Props' keys are: {Object.keys(props).join(",")}</p>
    </div>
  )
}

export default Child
