import storage from '@/lib/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import JSZip from 'jszip'
import b64ToBlob from 'b64-to-blob'
import fileSaver from 'file-saver'

const listRef = ref(storage, 'resumes/')
const zip = new JSZip()

export const loadFiles = (setDocs) => {
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
}

export const downloadFile = (doc) => {
  getDownloadURL(ref(storage, 'resumes/' + doc.name))
  .then((url) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.open('GET', url)
    xhr.onload = () => {
      const blob = xhr.response
      saveBlob(blob, doc.name)
    }
    xhr.send()
  })
}

const saveBlob = (blob, fileName) => {
  var a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = fileName
  a.click()
}

let zipBlob = function(doc) {
  return new Promise((resolve, reject) => {
    getDownloadURL(ref(storage, 'resumes/' + doc.name))
    .then((url) => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.open('GET', url)
      xhr.onload = () => {
        const blob = xhr.response
        zip.file(doc.name, blob)
        resolve('Resolved')
      }
      xhr.send()
    })
  })
}

export const downloadFiles = (docs) => {
  if (docs.length > 1) {
    Promise.allSettled(Array(docs.length).fill(1).map((_, idx) => zipBlob(docs[idx])))
    .then((res) => {
      zip.generateAsync({ type: 'base64' })
      .then((zipAsBase64) => {
        const blob = b64ToBlob(zipAsBase64, 'application/zip')
        const date = new Date()
        const year = String(date.getFullYear())
        const month = date.getMonth() < 9 ? '0' + String( date.getMonth()+1) : String( date.getMonth()+1)
        const day = date.getDate() <= 9 ? String(date.getDate()) : String(date.getDate())
        const hour = date.getHours() <= 9 ? String(date.getHours()) : String(date.getHours())
        const minute = date.getMinutes() <= 9 ? String(date.getMinutes()) : String(date.getMinutes())
        const second = date.getSeconds() <= 9 ? String(date.getSeconds()) : String(date.getSeconds())
        const filename = 'resumes-download-' + year + month + day + 'T' + hour + minute + second + '.zip'
        fileSaver.saveAs(blob, filename)
      })
    })
  }
  else { downloadFile(docs[0]) }
}

export const openFile = (doc) => {
  getDownloadURL(ref(storage, 'resumes/' + doc.name))
  .then((url) => {
    window.open(url, '_blank')
  })
}
