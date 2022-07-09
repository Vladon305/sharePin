import { IdentifiedSanityDocumentStub, SanityDocumentStub, UploadOptions } from "@sanity/client"
import { client } from "../client"

type AttributeSet = { [key: string]: any }

export const fetchingAPI = async (query: string) => {
  return await client.fetch(query)
}

export const createAPI = async (doc: SanityDocumentStub<any>) => {
  return await client.create(doc)
}

export const createIfNotExistsAPI = async (doc: IdentifiedSanityDocumentStub<any>) => {
  return await client.createIfNotExists(doc)
}

export const patchAPI = async (documentId: string, attrs: AttributeSet, inserting: { at: "replace" | "before" | "after", selector: string, items: any[] }) => {
  return await client.patch(documentId)
    .setIfMissing(attrs)
    .insert(inserting.at, inserting.selector, inserting.items)
    .commit()
}

export const assetAPI = async (assetType: "image", body: File | Blob | Buffer | ReadableStream<any>,
  options?: UploadOptions | undefined) => {
  return await client.assets
    .upload(assetType, body, options)
}

export const deleteAPI = async (id: string) => {
  return await client.delete(id)
}