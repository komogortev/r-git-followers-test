export interface userType {
  username: string|null,
  followers?: Array<any>
}

export interface followersListType {
  [key: string]: [value: Array<string>]
}