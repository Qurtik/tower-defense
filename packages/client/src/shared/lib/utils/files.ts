import { FileExtension } from '@/shared/types/fileSystem'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonToCsvString(
  jsonData: Record<string, any>[],
  rowHeaders?: string[],
  separator = ','
) {
  let csv = ''
  const dataFields = Object.keys(jsonData[0])
  const headers = rowHeaders ?? Object.keys(jsonData[0])
  csv += headers.join(separator) + '\n'
  jsonData.forEach(obj => {
    const values = dataFields.map(header => obj[header])
    csv += values.join(separator) + '\n'
  })
  return csv
}

export async function saveDataToFile(
  data: string,
  suggestedFileName = `tower-defense_${new Date().toISOString().split('T')[0]}`
) {
  const taBlob = new Blob([data], { type: 'text/plain' })
  const pickerOptions = {
    suggestedName: `${suggestedFileName.toLowerCase()}.txt`,
    types: [
      {
        description: 'Simple Text File',
        accept: {
          'text/plain': ['.txt' as FileExtension],
        },
      },
    ],
  }
  const fileHandle = await window.showSaveFilePicker(pickerOptions)
  const writableFileStream = await fileHandle.createWritable()
  await writableFileStream.write(taBlob)
  await writableFileStream.close()
}
