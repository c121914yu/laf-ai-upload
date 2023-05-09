import { OauthEnum } from '@/constants'

interface UserOauth {
  // 用户身份模型
  oauthId: string // 身份值
  oauthType: keyof typeof OauthEnum // 身份类型
}
interface UserRole {
  // 用户权限
  id: number
  name: string
}

export interface UserListItemType {
  // 用户列表中单个用户信息
  userId?: number // 用户id
  nickname?: string // 昵称
  gender?: boolean // 性别
  avatarUrl?: string // 头像
  major?: string // 专业技能
}
export interface UserInfoType extends UserListItemType {
  // 用户基本信息
  intro?: string // 个人介绍
  specialtyTags?: string // 特长标签
  compTags?: string // 竞赛标签
  email?: string // 邮箱
  trueName?: string // 真实姓名
}
export interface User {
  // 用户全量信息
  ahaCredit: number // Aha币
  ahaPoint: number // Aha点
  oauths: UserOauth[] // 身份类型
  role: UserRole // 身份
  signedContract: boolean // 是否签署合同
  signedNotice: boolean // 是否签署协议
  userInfo: UserInfoType
}

export interface UserStatistics {
  ahaCredit: number
  ahaPoint: number
  totalProject: number
  totalCollection:number
  recentViewCount: number
  allAdvProfit: number
  lastDayAdvProfit:number
  monthUnlockCount: number
  yesterdayUnlockCount: number
}
