import { VNode } from 'vue/types/umd'
import { CreateElement } from 'vue'

export interface EditConfig {
  type?: string, // 废弃
  attr?: { [propName: string]: any };
  format?: string, // 废弃
  data?: [], // 废弃
  customField?: { // 废弃
    key: string,
    label: string
  }
}
export interface Col {
  dataIndex: string,
  title: (h: CreateElement) => VNode | string,
  width?: string,
  minWidth?: string,
  maxWidth?: string,
  children?: Col[],
  fixed?: string,
  className?: string[],
  colSpan?: number,
  rowSpan?: number,
  type?: 'string' | 'number' | 'enum' | 'date' | 'dateTime',
  enumData?: Array<{ [propName: string]: string }>,
  enumField?: {
    key: string,
    label: string
  },
  editConfig?: EditConfig | null,
  sort?: boolean,
  filter?: boolean,
  render?: (h: CreateElement, dataIndex: string, rowIndex: number, value: string | number | null) => VNode
}
export interface CellMousedownBackParams {
  isFixed: boolean,
  dataIndex: string,
  rowIndex: number,
  offsetTop: number,
  offsetLeft: number,
  width: number,
  height: number
}
