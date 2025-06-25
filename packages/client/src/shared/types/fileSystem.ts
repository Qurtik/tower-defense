export type WellKnownDirectory =
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'
export type FileExtension = `.${string}`
export type MIMEType = `${string}/${string}`
export interface FilePickerAcceptType {
  /**
   * @default ""
   */
  description?: string | undefined
  accept?: Record<MIMEType, FileExtension | FileExtension[]> | undefined
}

export interface FilePickerOptions {
  types?: FilePickerAcceptType[] | undefined
  /**
   * @default false
   */
  excludeAcceptAllOption?: boolean | undefined
  startIn?: WellKnownDirectory | FileSystemHandle | undefined
  id?: string | undefined
}

declare global {
  interface Window {
    showSaveFilePicker: (
      options?: FilePickerOptions
    ) => Promise<FileSystemFileHandle>
  }
}
