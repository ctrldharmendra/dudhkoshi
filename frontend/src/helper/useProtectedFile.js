// useProtectedFile.js
import { useState, useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance'

const useProtectedFile = (filePath) => {
  const [objectUrl, setObjectUrl] = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  useEffect(() => {
    if (!filePath) return

    let localUrl = null

    const fetchFile = async () => {
      try {
        setLoading(true)

        const response = await axiosInstance.get(
          `/uploads/${filePath}`,  // ✅ /api/uploads not /uploads
          { responseType: 'blob' }
        )

        localUrl = URL.createObjectURL(response.data)
        setObjectUrl(localUrl)

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load file')
      } finally {
        setLoading(false)
      }
    }

    fetchFile()

    return () => {
      if (localUrl) URL.revokeObjectURL(localUrl)
    }
  }, [filePath])

  return { objectUrl, loading, error }
}

export default useProtectedFile