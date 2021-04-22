import mountComponent from './mountComponent'
import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, container) {
    if (typeof virtualDOM.type === 'function') {
        // Component
        mountComponent(virtualDOM, container)
    } else {
        // Native Element
        mountNativeElement(virtualDOM, container)
    }
}