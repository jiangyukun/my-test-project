import React from 'react'
import { ColumnProps } from 'antd/lib/table'

class List1 extends React.Component<any, any> {
  getColumns(): ColumnProps<any>[] {
    return [
      {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        width: 65,
        align: 'center'
      },
      {
        title: '客户名称',
        dataIndex: 'title',
        key: 'title',
        width: 160
      },
      {
        title: '客户性质',
        dataIndex: 'isIndividual',
        key: 'isIndividual',
        render: (value) => value ? '个人' : '单位',
        width: 100,
        align: 'center'
      },
      {
        title: '客户类型',
        dataIndex: 'firmTypeTitle',
        key: 'firmTypeTitle',
        width: 100
      },
      {
        title: '电站数量',
        dataIndex: 'count',
        key: 'count',
        width: 85,
        render: (text, record, index) => {
          return (
            <>
              {text === 0 ? (
                0
              ) : (
                <div>
                  {text}
                </div>
              )}
            </>
          )
        },
        align: 'right'
      },
      {
        title: '电站总规模',
        dataIndex: 'scale',
        key: 'scale',
        width: 160,
        align: 'right'
      },
      {
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
        width: 100,
        align: 'center'
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
        align: 'center'
      },
      {
        title: '有效性',
        dataIndex: 'activityTitle',
        key: 'activityTitle',
        align: 'center',
        width: 80,
        render: (text, record, index) => {
          return <div className="editable-row-operations">{<span>{record.activity ? '有效' : '无效'}</span>}</div>
        }
      },
      {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              <a onClick={() => this.props.edit(record)}>编辑</a>
            </div>
          )
        }
      }
    ]
  }
}

export default List1
