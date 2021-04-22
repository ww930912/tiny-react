export default function createElement(type, props, ...children) {
    const childrenElement = [...children].reduce((rst, child) => {
        // 判断不是boolean或null，才创建DOM
        if (child !== true && child !== false && child !== null) {
            if( child instanceof Object ) {
                // 是节点
                rst.push(child)
            } else {
                // 是文本，创建节点
                rst.push(createElement('text', { textContent: child }))
            }
        }
        return rst
    }, []) // 第二参数，结果的初始值
    return {
        type,
        props: Object.assign({children: childrenElement}, props), // 把children放进props里
        children: childrenElement,
    }
}