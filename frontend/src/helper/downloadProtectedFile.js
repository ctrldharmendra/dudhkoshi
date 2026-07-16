export const downloadProtectedFile = async (filePath, fileName) => {
  const response = await axiosInstance.get(
    `/api/uploads/${filePath}`,  // ✅ /api/uploads not /uploads
    { responseType: 'blob' }
  )

  const url  = URL.createObjectURL(response.data)
  const link = document.createElement('a')
  link.href  = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}