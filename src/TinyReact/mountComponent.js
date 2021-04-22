import mountElement from "./mountElement"

export default function mountComponent(virtualDOM, container) {
    const { type, props } = virtualDOM
    if (type.prototype && type.prototype.render) {
        // 类组件extends Component
        const component = new type(props || {})
        const newVirtualDOM = component.render()
        newVirtualDOM.component = component
        mountElement(newVirtualDOM, container)
        // 添加类组件ref属性
        if (component) {
            component.componentDidMount()
            if (component.props && component.props.ref) {
                component.props.ref(component)
            }
        }
    } else {
        // 函数组件Function
        mountElement(type(props || {}), container)
    }
}