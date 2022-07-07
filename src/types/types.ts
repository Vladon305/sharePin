export type User = {
  _createdAt: string
  _id: number
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
  }
}

export type PostedBy = {
  _id: string
  _ref: string
  _type: string
  image: string
  userName: string
}

export type Save = {
  _id: string
  _type: string
  _createdAt: string | undefined
  postedBy: PostedBy
  userId: string
  _rev: string
  _updatedAt: string
}

export type PinType = {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  about: string
  destination: string
  category: string
  image: Image
  postedBy: PostedBy
  save: Save[]
  userId: number
}

export type DecodedResponseData = {
  name: string
  sub: string
  picture: string
}