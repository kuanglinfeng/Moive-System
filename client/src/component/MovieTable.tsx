import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Table, Switch } from 'antd'
import { ColumnProps } from "antd/lib/table";
import { IMovie } from "../services/MovieService";
import defaultposterImg from '../assets/defaultposterImg.jpeg'
import { SwitchType } from "../services/CommonTypes";

export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void
  onSwitchChange: (type: SwitchType, newState: boolean, id: string) => void
}

export default class extends React.Component<IMovieState & IMovieTableEvents> {

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  private getColumns(): ColumnProps<IMovie>[] {

    return [
      {
        title: '封面', 
        dataIndex: 'poster',
        render(poster) {
          if (poster) {
            return <img className='tablePoster' src={poster} />
          } else {
            return <img className='tablePoster' src={defaultposterImg} alt=""/>
          }
        }
      },
      {title: '名称', dataIndex: 'name'},
      {
        title: '地区', 
        dataIndex: 'areas',
        render(text: string[]) {
          return text.join(', ')
        }
      },
      {
        title: '类型', 
        dataIndex: 'types',
        render(text: string[]) {
          return text.join(', ')
        }
      },
      {
        title: '时长', 
        dataIndex: 'timeLong',
        render(timeLong) {
          return timeLong + '分钟'
        }
      },
      {
        title: '正在热映', 
        dataIndex: 'isHot',
        render: (isHot, record) => {
          return <Switch checked={isHot} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!)
          }} />
        }
      },
      {
        title: '即将上映', 
        dataIndex: 'isComing',
        render: (isHot, record) => {
          return <Switch checked={isHot} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!)
          }} />
        }
      },
      {
        title: '经典影片', 
        dataIndex: 'isClassic',
        render: (isHot, record) => {
          return <Switch checked={isHot} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!)
          }} />
        }
      },
    ]
  }

  render() {
    return (
      <Table rowKey={'_id'} dataSource={this.props.data} columns={this.getColumns()}>

      </Table>
    )
  }
}