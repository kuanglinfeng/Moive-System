import React from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import { Table } from 'antd'
import { ColumnProps } from "antd/lib/table";
import { IMovie } from "../services/MovieService";

export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad(): void
}

export default class extends React.Component<IMovieState & IMovieTableEvents> {

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  private getColumns(): ColumnProps<IMovie>[] {

    return [
      {title: '名称', dataIndex: 'name'},
      {title: '地区', dataIndex: 'areas'}
    ]
  }

  render() {
    return (
      <Table dataSource={this.props.data} columns={this.getColumns()}>

      </Table>
    )
  }
}