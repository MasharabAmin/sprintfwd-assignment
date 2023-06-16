import { MemberProps } from "./member.interface"
import { TeamProps } from "./team.interface"

export interface TableProps {
  tableData: TeamProps[] | MemberProps[]
  columns: TableColumn[]
  itemsPerPage: number
}

export interface TableColumn {
  name: string
  label: string
}

export interface TableBodyProps {
  data: MemberProps[] | TeamProps[]
  columns: TableColumn[]
}

export interface TableHeadProps {
  columns: TableColumn[]
}

