import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button } from '@mui/material';
import { useWorkspaceContext } from '../../../../../providers/WorkspaceProvider';
import { createRef } from 'react';
import dataService from '../../../../../services/DataService';
import { useStatesContext } from '../../../../../providers/StatesProvider';

export default function ImportBtn() {
  const { workspace } = useWorkspaceContext()
  const { updateAll } = useStatesContext()
  const inputRef = createRef()

  const handleImport = async (event) => {
    const file = event.target.files[0]
    await dataService.loadDataFromFile(workspace, file)
    updateAll()
  }

  const handleBtnClick = () => {
    inputRef.current.click()
  }

  return (
    <div>
      <Button
        startIcon={<FileUploadIcon />}
        onClick={handleBtnClick}
      >
        Import
      </Button>
      <input
        ref={inputRef}
        type='file'
        onChange={handleImport}
        style={{display: 'none'}}
      />
    </div>
  )
}