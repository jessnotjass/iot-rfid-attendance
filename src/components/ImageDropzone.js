import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { setImage } from '../actions/image/setImage'

const ImageDropzone = () => {
  const dispatch = useDispatch()
  const src = useSelector(state => state.image.current)
  const getBase64 = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => dispatch(setImage(reader.result))
    reader.onerror = error => console.log(error)
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(getBase64(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      { src ? <img src={src} width={200} height={200}/> : <div /> }
      <input {...getInputProps()} />
      {
        isDragActive ? <p>Drop Image Here</p> : <p>Drag and drop image file here or click to select file.</p>
      }
    </div>
  )
}

export default ImageDropzone
