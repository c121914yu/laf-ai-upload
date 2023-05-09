import { PROJECT_TYPE_MAP } from '@/constants'

export type ProjectType = `${ PROJECT_TYPE_MAP }`

export interface CompetitionProjectType {
  compId?: number
  compName?: string
  awardLevel?: number
  awardTime?: string
  awardProveUrl?: string
  awardProveFile?: File
}
export interface CourseDesignType {
  courseType?: number,
  courseName?: string
  courseId?: number
}

export interface ProjectBuildType extends CompetitionProjectType, CourseDesignType { // 项目构建信息
  id?: number
  name: string
  avatarUrl?: string
  avatarFile?: File
  tags?: string
  intro?: string
}

export interface ProjectDetailType extends CompetitionProjectType, CourseDesignType{
  id:number
  name: string
  avatarUrl: string
  tags: string
  intro: string

  createTime:string
  passed: boolean
  read: number
  collect: number

  resources: FileType[]
}

export interface ProjectCardType {
  id: number
  name: string
  avatarUrl?: string
  tags?: string
  read?: number
  collect?: number
  projectName?: string
  passed: boolean
  createTime: string
}
export interface SetFileType { // 编辑文件类型
  id: number | string
  name: string
  size?: number
  typeId: number // 默认选中的附件分类
  fileType: number // FILE_TYPES里的value
  progress: number // 上传进度条
  status: number // 0 待上传，1 上传中，2上传完成，3上传失败
  price: number
  rawFile?: File
  passed: boolean
  discount: number
}
export interface FileType { // 单个文件全量信息
  id: number
  filename: string
  discount: number
  download: number
  expireTime: string | null
  fileType: number
  name: string
  passed: boolean
  previewUrl: string
  price: number
  score: number
  scoreCount: number
  typeId: number
}
