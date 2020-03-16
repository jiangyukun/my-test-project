import React from 'react'
import B from './B'
import List1 from './List1'


console.log(23)

class A extends React.Component<any, any> {
  render() {
    return (
      <div className="index">
        <button onClick={() => null}>按钮1</button>
        <button onClick={() => null}>按钮2</button>
        <button onClick={() => null}>按钮3</button>
        {/*<Button type="primary">antd but</Button>*/}
        <List1/>
        <B/>
      </div>
    )
  }
}

// auto