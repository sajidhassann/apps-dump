import { MimeType } from '../enums/mime.type.enum'

export const imageMimeTypeMap = Object.values(MimeType)
  .filter((mimeType) => mimeType.startsWith('image'))
  .reduce((dict: { [p: string]: boolean }, elem) => {
    dict[elem] = true
    return dict
  }, {})

export const videoMimeTypeMap = Object.values(MimeType)
  .filter((mimeType) => mimeType.startsWith('video'))
  .reduce((dict: { [p: string]: boolean }, elem) => {
    dict[elem] = true
    return dict
  }, {})

export const documentMimeTypeMap = Object.values(MimeType)
  .filter((mimeType) => mimeType.startsWith('application'))
  .reduce((dict: { [p: string]: boolean }, elem) => {
    dict[elem] = true
    return dict
  }, {})
