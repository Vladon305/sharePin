export type User = {
  _createdAt: string
  _id: number | string
  _rev: string
  _type: string
  _updatedAt: string
  image: string
  userName: string
}

export type Image = {
  _type: string
  asset: {
    _ref: string
    _type: string
    url?: string
  }
}

export type CategoryType = {
  name: string
  image: string
}

export type PostedBy = {
  _id?: string
  _ref: string | number | undefined | null
  _type: string
  image?: string
  userName?: string
}

export type Save = {
  _key: string
  postedBy: PostedBy
  userId: string
}
export type Comment = {
  postedBy: PostedBy,
  comment: string
}

export type PinType = {
  _createdAt?: string
  _id: string
  _rev?: string
  _type?: string
  _updatedAt?: string
  title?: string
  about?: string
  destination?: string
  category?: string
  image: Image
  postedBy?: PostedBy
  comments: Comment[]
  save?: Save[]
  userId?: number | string | null | undefined
}

export type DecodedResponseData = {
  name: string
  sub: string
  picture: string
}