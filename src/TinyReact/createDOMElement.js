import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
export default function createDOMElement(virtualDOM) { 
    let newElement = null
    if(virtualDOM.type === 'text') {
        // 文本节点
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        // 元素节点
        newElement = document.createElement(virtualDOM.type)
        // 解析元素节点属性
        updateNodeElement(newElement, virtualDOM)
        // 递归创建子节点
        virtualDOM.children.forEach(child => {
            mountElement(child, newElement)
        })
        // 添加支持ref属性，获取当前DOM实例对象
        if(virtualDOM.props && virtualDOM.props.ref) {
            virtualDOM.props.ref(newElement)
        }
    }
    // 为每个DOM元素设置_virtualDOM属性，用于对比节点是否发生变化
    newElement._virtualDOM = virtualDOM
    return newElement
}
