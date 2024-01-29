import { CloseButton, Modal, ModalProps } from '@mantine/core'
import { Dispatch, SetStateAction, useCallback } from 'react'

type VideoModalProps = Omit<ModalProps, 'opened' | 'onClose'> & {
    isVideoModalOpen: boolean;
    setIsVideoModalOpen: Dispatch<SetStateAction<boolean>>;
    videoURL: string;
    width: number;
    height: number;
    onClose?: () => void;
};

export default function VideoModal(props: VideoModalProps) {
    const {
        isVideoModalOpen,
        setIsVideoModalOpen,
        videoURL,
        width,
        height,
        onClose,
        ...modalProps
    } = props
  
    const handleClose = useCallback(() => {
        setIsVideoModalOpen(false)
        onClose?.()
    }, [onClose, setIsVideoModalOpen])

    return (
        <Modal opened={isVideoModalOpen} onClose={handleClose} {...modalProps}>
            <div style={{ position: 'relative', width, height }}>
                <CloseButton
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1,
                        color: 'black',
                    }}
                    onClick={handleClose}
                />
                <video
                    src={videoURL}
                    width={width}
                    height={height}
                    controls
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </Modal>
    )
}
