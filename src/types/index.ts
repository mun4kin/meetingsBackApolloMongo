export interface IMeeting{
  id?:string
  name:string
  description:string
  timeStamp:number
  users:string[]
}
export interface IUser{
  id?:string
  email:string,
  firstName: string,
  secondName:string,
  password:string,
  photo:string,
  isAdmin?:boolean
}
export interface ILogin{
  id:string,
  email:string,
  token: string,
  expired:number
}
