import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Stack, TextInput, Title, Text } from '@mantine/core';
import { IFerozisState, deleteFerozi, listFerozis, manageFerozi } from '@/src/application/redux/features/ferozis';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconTrash } from '@tabler/icons-react';

export function DeleteFerozi() {
    const [opened, { open, close }] = useDisclosure(false);

    const { currentFerozi }: IFerozisState = useAppSelector<IFerozisState>(
        (state) => state.ferozi
    );

    const deletionForm = useForm<{ feroziName: string }>({
        initialValues: {
            feroziName: '',
        },
        validate: {
            feroziName: (value) => {
                console.log(value, currentFerozi?.name);
                if (value !== currentFerozi?.name) {
                    return 'Ferozi name does not match';
                }
            },
        },

    });

    const [deletingFerozi, setDeletingFerozi] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit = async (values: { feroziName: string }) => {
        console.log(values);
        setDeletingFerozi(true);
        try {
            await dispatch(
                deleteFerozi(
                    currentFerozi?.id as string,
                )
            ).unwrap();
            close();
            router.push('/admin/ferozis');
            dispatch(listFerozis());
            setDeletingFerozi(false);
        } catch (e) {
            console.log(e);
            close();
            setDeletingFerozi(false);
        }


    };
    return <>
        <Button leftSection={<IconTrash size={14} />} variant="outline" color="red" onClick={open}>
            Delete Ferozi
        </Button>
        <Modal
            opened={opened} withCloseButton={true}
            title={<Title order={4} c={'red'}>Warning - Ferozi Deletion</Title>}
            centered
            size="md"
            onClose={close}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}>
            <form onSubmit={deletionForm.onSubmit(onSubmit)}>
                <Stack>
                    <Text>
                        Are you sure you want to delete this Ferozi?
                    </Text>
                    <Text>
                        This action is irreversible. You will not be able to recover this Ferozi. This will also delete all the Users and analytics associated with this Ferozi.
                    </Text>
                    <Text>
                        Please type the Ferozi name i.e <b>{currentFerozi?.name}</b> to confirm deletion.
                    </Text>

                    <TextInput
                        placeholder="Ferozi name"
                        label="Ferozi Name"
                        required
                        {...deletionForm.getInputProps('feroziName')}
                    />
                    <Button color="red" loading={deletingFerozi} onClick={
                        () => {
                            const result = deletionForm.validate();
                            if (!result.hasErrors) {
                                onSubmit(deletionForm.values);
                            }

                        }
                    }>
                        Delete Ferozi
                    </Button>

                </Stack>
            </form>


        </Modal >
    </>


}

