export default function updateNodeElement(newElement, virtualDOM, _virtualDOM = {}) {
    // 没有_virtualDOM，则是第一次渲染，新增属性
    if (Reflect.ownKeys(_virtualDOM).length === 0) {
        console.log('新增属性----')
        // 新增属性
        const { props } = virtualDOM
        console.log('props', props)
        Reflect.ownKeys(props).forEach(propName => {
            // 如果是children，则排除
            const propsValue = props[propName]
            if (propName !== 'children') {
                if (propName.slice(0, 2) === 'on') {
                    // 如果是事件属性，各种事件，比如：on
                    // 把onClick -> click
                    const event = propName.toLocaleLowerCase().slice(2)
                    newElement.addEventListener(event, propsValue)
                } else if (propName === 'value' || propName === 'checked') {
                    // 如果是名称属性，比如：value或checked
                    newElement[propName] = propsValue
                } else if (propName === 'className') {
                    // 如果是样式属性，className
                    // 把className -> class
                    newElement.setAttribute('class', propsValue)
                } else {
                    // 如果是自定义属性，比如：data-test
                    newElement.setAttribute(propName, propsValue)
                }
            }
        })
    } else {
        // 更新属性
        console.log('更新属性----')
        const { props: newProps } = virtualDOM
        const { props: oldProps } = _virtualDOM
        Reflect.ownKeys(newProps).forEach(propName => {
            if (propName !== 'children') {
                const newPropsValue = newProps[propName]
                const oldPropsValue = oldProps[propName]
                if (newPropsValue !== oldPropsValue) {
                    console.log('属性值不同----------需要更新')
                    // 属性值不同
                    if (propName.slice(0, 2) === 'on') {
                        // 如果是事件属性，各种事件，比如：on
                        // 把onClick -> click
                        const event = propName.toLocaleLowerCase().slice(2)
                        newElement.removeEventListener(event, oldPropsValue)
                        newElement.addEventListener(event, newPropsValue)
                    } else if (propName === 'value' || propName === 'checked') {
                        // 如果是名称属性，比如：value或checked
                        newElement[propName] = newPropsValue
                    } else if (propName === 'className') {
                        // 如果是样式属性，className
                        // 把className -> class
                        newElement.setAttribute('class', newPropsValue)
                    } else {
                        // 如果是自定义属性，比如：data-test
                        newElement.setAttribute(propName, newPropsValue)
                    }
                }
            }
        })
        // 判断属性被删除的情况
        Reflect.ownKeys(oldProps).forEach(propName => {
            if (propName !== 'children') {
                const newPropsValue = newProps[propName]
                const oldPropsValue = oldProps[propName]
                if(!newPropsValue) {
                    // 属性值被删除了
                    console.log('属性需要删除----', propName)
                    if (propName.slice(0, 2) === 'on') {
                        // 如果是事件属性，各种事件，比如：on
                        // 把onClick -> click
                        const event = propName.toLocaleLowerCase().slice(2)
                        newElement.removeEventListener(event, oldPropsValue)
                    } else {
                        // 如果是非事件属性
                        newElement.removeAttribute(propName)
                    }
                }
            }
        })
    }
}