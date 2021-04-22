import createDOMElement from "./createDOMElement"

export default function mountNativeElement(virtualDOM, container) {
    const newElement = createDOMElement(virtualDOM)
    // 转化的DOM放置到页面中
    container.appendChild(newElement)
    console.log('appendChild', container, newElement)
    // 类组件
    const component = virtualDOM.component
    if (component) {
        component.setDOM(newElement)
    }
}