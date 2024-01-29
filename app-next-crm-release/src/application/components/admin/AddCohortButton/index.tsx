import { Box, Button, createStyles, Text } from '@mantine/core'
import { ReactNode, useState } from 'react'
import AddCohortModal from '../AddCohortModal'
import UploadUserListModal from '../UploadUserListModal'

interface IActionBoxProps {
  title: string;
  excerpt: string;
  background: string;
  icon: ReactNode;
  modalType: string;
}


function AddCohortButton() {


  const [openAddCohortModal, setOpenAddCohortModal] = useState(false)


  const openListModalClickHandler = () => {
      setOpenAddCohortModal(true)
  }

  return (
    <>
        <Button color='yellow' onClick={openListModalClickHandler} ml={'auto'}>
        Add Cohort  
      </Button>
        {openAddCohortModal && <AddCohortModal isOpen={openAddCohortModal} setIsOpen={setOpenAddCohortModal} />}
    </>
  )
}

export default AddCohortButton
