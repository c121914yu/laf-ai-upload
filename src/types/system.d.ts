export interface CourseType { // 单个课程类型
  courseId: number,
  courseType: number,
  courseName: string
}
export interface CompetitionType { // 单个比赛类型
  id: number
  competitionType: {
    id: number
    name: string
  }
  name: string
  level: number
  intro: string
  selectedSeasonHot: boolean
}

export interface CosUploadSign { // cos上传签名
  filename:string
  policy:string
  secretId:string
  keyTime:string
  signature:string
  bucketName:string
  region:string
}
