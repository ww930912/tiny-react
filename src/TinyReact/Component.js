import diff from "./diff"

export default class Component {
    constructor(props) {
        this.props = props
    }
    setState(state) {
        this.state = Object.assign({} , this.state, state)
        const newVirtualDOM = this.render()
        const oldDOM = this.getDOM()
        diff(newVirtualDOM, oldDOM.parentNode, oldDOM)
    }
    setDOM(dom) {
        // 老的dom元素
        this._dom = dom
    }
    getDOM() {
        return this._dom
    }
    updateProps(props) {
        console.log('updateProps---',props)
        this.props = props
    }

    // 生命周期函数
  componentWillMount() {}
  componentDidMount() {console.log('组件渲染完成')}
  componentWillReceiveProps(nextProps) {console.log('即将收到新props',nextProps)}
  shouldComponentUpdate(nextProps, nextState) {
    console.log('是否更新props', nextProps != this.props || nextState != this.state)
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {console.log('即将更新props',nextProps)}
  componentDidUpdate(prevProps, preState) {console.log('更新完成props', prevProps)}
  componentWillUnmount() {}
}