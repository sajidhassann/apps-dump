import { Image, Modal } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'

type ImageModalProps = {
  isImageModalOpen: boolean;
  setIsImageModalOpen: Dispatch<SetStateAction<boolean>>;
  imageURL: string;
};

export default function ImageModal(props: ImageModalProps) {
  const { isImageModalOpen, setIsImageModalOpen, imageURL } = props


  return (
    <Modal
      opened={isImageModalOpen}
      onClose={() => setIsImageModalOpen(false)}
      centered
      withCloseButton={false}
      padding={0}
    >
        <Image
          src={imageURL}
          alt=""
          style={{ objectFit: 'cover' }}
        />
    </Modal>
  )
}
