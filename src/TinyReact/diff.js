import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function diff(virtualDOM, container, oldDOM) {
    // 判断oldDOM是否存在
    if (!oldDOM) {
        mountElement(virtualDOM, container)
    } else {
        // 更新对比逻辑
        const { _virtualDOM } = oldDOM
        if (typeof virtualDOM.type === 'function') {
            // Component，component为oldComponent
            const {component} = _virtualDOM
            console.log('Component', component)
            // 判断是否是同一个组件
            if (component && virtualDOM.type === component.constructor) {
                console.log('同一个组件')
                // 即将收到新props
                component.componentWillReceiveProps(virtualDOM.props)
                // 是否更新props
                if (component.shouldComponentUpdate()) {
                    console.log('需要更新')
                    // 即将更新props
                    component.componentWillUpdate(virtualDOM.props, {})

                    component.updateProps(virtualDOM.props)
                    // 获取新的virtualDOM
                    const newVirtualDOM = component.render()
                    // 执行diff
                    diff(newVirtualDOM, container, oldDOM)

                    // 更新完成props
                    component.componentDidUpdate(_virtualDOM.props, {})
                }
            } else {
                console.log('不同的组件', oldDOM)
                // 删除老DOM
                oldDOM.remove()
                // 新增新DOM
                diff(virtualDOM, container)
            }
            return
        }
        // 第一种情况，Virtual DOM 类型相同
        if(virtualDOM.type === _virtualDOM.type) {
            if(virtualDOM.type === 'text') {
                // 文本节点 对比文本内容是否发生变化
                const { textContent: newText } = virtualDOM.props
                const { textContent: oldText } = _virtualDOM.props
                if (newText !== oldText) {
                    oldDOM.textContent = newText
                    oldDOM._virtualDOM = virtualDOM
                }
            } else {
                // 元素节点 对比属性内容是否发生变化
                updateNodeElement(oldDOM, virtualDOM, _virtualDOM)
            }
            // 递归创建子节点
            virtualDOM.children.forEach((child, i) => {
                diff(child, oldDOM, oldDOM.childNodes[i])
            })
            // 判断新节点和老节点的数量，如果老节点的数量大于新节点的数量，则有删除节点
            const nLen = virtualDOM.children.length
            const oLen = oldDOM.childNodes.length
            if (oLen > nLen) {
                for(let i = oLen - 1; i > nLen - 1; i-- ) {
                    oldDOM.removeChild(oldDOM.childNodes[i])
                }
            }
        } else {
            // 第二种情况，Virtual DOM 类型不相同
            // 将老的元素节点替换
            const newNode = createDOMElement(virtualDOM)
            oldDOM.parentNode.replaceChild(newNode, oldDOM)
        }
    }
}