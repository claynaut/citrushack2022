import React, { useState, useEffect } from 'react'
import storage from '@/lib/firebase'
import { ref, listAll, getDownloadURL, getBlob } from 'firebase/storage'
import JSZip from 'jszip'

export function Resumes() {
  const zip = new JSZip()
  const [docs, setDocs] = useState(localStorage.getItem('docs') ? JSON.parse(localStorage.getItem('docs')) : [])
  const listRef = ref(storage, 'resumes/')

  const downloadFile = (doc) => {
    getDownloadURL(doc.ref)
    .then((url) => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = () => {
        const blob = xhr.response
        saveBlob(blob, doc.name)
      }
      xhr.open('GET', url)
      xhr.send()
    })
  }

  const saveBlob = (blob, fileName) => {
    var a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = fileName
    a.click()
  }

  useEffect(() => {
    listAll(listRef)
    .then((res) => {
      var currentDocs = []
      res.items.forEach((itemRef) => {
        const doc = {
          ref: itemRef,
          name: itemRef.toString().replace('gs://citrus-hack-2022.appspot.com/resumes/', '')
        }
        currentDocs = [...currentDocs, doc]
      })
      setDocs(currentDocs)
      localStorage.setItem('docs', JSON.stringify(currentDocs))
    })
  }, [listRef]);

  return (
    <>
      { docs.map((doc) => 
        <div className='flex'>
          <div>
            {doc.name}
          </div>
          <div>
            <button className='border-2' onClick={() => downloadFile(doc)}>
              Download
            </button>
          </div>
        </div>
      )}
    </>
  )
}