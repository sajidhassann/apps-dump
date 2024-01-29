import { Box, Button, Modal, Text } from '@mantine/core'
import React from 'react'

interface DeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onDelete: () => void
}

const DeleteModal = (props: DeleteModalProps) => {
const { isOpen, onClose, onDelete } = props
    

  return (
      <Modal opened={isOpen} onClose={onClose} title="Delete Macro" centered={true}>
          <Text sx={{ textAlign: 'center' }}>Deleting, Are you sure?</Text>
          <Box p='1rem' sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
              <Button variant='outline' color='red' onClick={onDelete}>
                  Delete
              </Button>
              <Button variant='outline' color='blue' onClick={onClose}>
                  Cancel
              </Button>
          </Box>
      </Modal>
  )
}

export default DeleteModal