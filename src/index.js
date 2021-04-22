import TinyReact from './TinyReact'
const root = document.getElementById('root')
const virtualDOM = (
    <div className="container">
      <h1>你好 Tiny React</h1>
      <h2 data-test="test">(编码必杀技)</h2>
      <div>
        嵌套1 <div>嵌套 1.1</div>
      </div>
      <h3>(观察: 这个将会被改变)</h3>
      {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
      {2 == 2 && <div>2</div>}
      <span>这是一段内容</span>
      <button onClick={() => alert("你好")}>点击我</button>
      <h3>这个将会被删除</h3>
      2, 3
      <input type="text" value="13"/>
    </div>
  )
const modifyDOM = (
    <div className="container">
      <h1>你好 Tiny React</h1>
      <h2 data-test2="test123">(编码必杀技)</h2>
      <div>
        嵌套1 <div>嵌套 1.1</div>
      </div>
      <h3>(观察: 这个将会被改变)</h3>
      {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
      {2 == 2 && <div>2</div>}
      <div>这是更改后的内容</div>
      <button onClick={() => alert("你好!!!")}>点击我</button>
      <input type="text" value="13"/>
    </div>
)
const FunCompSecond = (props) => {
  return (<div>Hello, {props.name}</div>)
}
const FunComp = (props) => {
  return (
    <div>
      <div>Hello, {props.name}!</div>
    </div>
  )
}

class CompSecond extends TinyReact.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>Hello, {this.props.name}!</div>
    )
  }
}

class Comp extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Defualt Title'
    }
    this.changeTitle = this.changeTitle.bind(this)
  }
  changeTitle() {
    console.log('changeTitle---', this)
    this.setState({title:'Changed Title'})
  }
  componentDidMount() {console.log('componentDidMount组件渲染完成')}
  componentWillReceiveProps(nextProps) {console.log('componentWillReceiveProps即将收到新props',nextProps)}
  componentWillUpdate(nextProps, nextState) {console.log('componentWillUpdate即将更新props',nextProps)}
  componentDidUpdate(prevProps, preState) {console.log('componentDidUpdate更新完成props', prevProps)}
  render () {
    console.log(this.state)
    return (
      <div>
        <div>
          <div>{this.state.title}</div>
          <button onClick={this.changeTitle}>改变title</button>
        </div>
        <div>Hello, {this.props.name}!</div>
      </div>
    )
  }
}
class RefDemo extends TinyReact.Component {
  handle() {
    let value = this.input.value
    console.log(value)
    console.log(this.comp)
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Comp name="张三" ref={comp => this.comp = comp}/>
      </div>
    )
  }
}
TinyReact.render(<RefDemo name="张三"/>, root)
// setTimeout(() => {
//   TinyReact.render(<Comp name="李四"/>, root)
//   // TinyReact.render(modifyDOM, root)
// }, 2000)

