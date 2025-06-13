// ** React Imports
import toast from 'react-hot-toast'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

type Props = {
  file?: any
  setFile: (file: any) => void
  error: any
}

const FileUploaderSingle = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: acceptedFiles => {
      const selectedFile = acceptedFiles[0]
      props.setFile(Object.assign(selectedFile))
    },
    onDropRejected: () => {
      toast.error('You can only upload files of type .png, .jpeg, .jpg')
      toast.error("You can't upload files of greater than 2mb")
    }
  })

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={{
        ...(props.error ? { border: '2px dashed red' } : {}),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200, // minimum height when no image
        overflow: 'hidden', // ensures the image stays within bounds
        '&:hover': {
          cursor: 'pointer'
        }
      }}
    >
      <input {...getInputProps()} />
      {props.file ? (
        typeof props.file === 'string' ? (
          <Image
            key={props.file}
            alt={props.file}
            src={props.file.replaceAll('\\', '/')}
            width={0} // makes width responsive
            height={0} // makes height responsive
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        ) : (
          <Image
            key={props.file?.name || ''}
            alt={props.file?.name || ''}
            src={URL.createObjectURL(props.file)}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        )
      ) : (
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FileUploaderSingle