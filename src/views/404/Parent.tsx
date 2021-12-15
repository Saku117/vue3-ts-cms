import { defineComponent, ref } from "vue"
import Child from "./child"

export default defineComponent({
  components: {
    Child
  },
  setup() {
    const count = ref(0)
    const handleIncrease = () => {
      count.value++
    }
    return () => (
      <div
        style={{ padding: 10, backgroundColor: "#cef", textAlign: "center" }}
      >
        <h1>THIS IS PARENT</h1>
        <button onClick={handleIncrease}>Count++</button>
        <p>Parent count is {count.value}</p>
        <Child
          style={{ backgroundColor: "#ffd" }}
          count={count.value}
          onChildClick={handleIncrease}
        >
          {{
            header: () => <h3>SLot header</h3>,
            default: () => <h3>SLot default</h3>
          }}
        </Child>
      </div>
    )
  }
})
