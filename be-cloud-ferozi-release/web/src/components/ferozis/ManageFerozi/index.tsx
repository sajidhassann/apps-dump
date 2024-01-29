import {
    Box,
    Button,
    Center,
    Grid,
    Group,
    NumberInput,
    Paper,
    SegmentedControl,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteFerozi } from '@components/ferozis/DeleteFerozi';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { CiEdit } from 'react-icons/ci';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { FeroziType } from '@/src/application/redux/features/ferozis/models/ferozi.type.model';
import { ManageFeroziRequestDto } from '@/src/application/redux/features/ferozis/dto/manage.ferozi.request.dto';
import { createAsset, IFerozisState, listFerozis, manageFerozi } from '@/src/application/redux/features/ferozis';
import { ManagePopup, Popup } from './ManagePopup';
import { FeroziPopup } from './ManagePopup/ViewPopup';
import { FeroziNature } from '@/src/application/redux/features/ferozis/models/ferozi.nature.model';

type FormValues = {
    name: string;
    sqlQuery: string;
    passPercentage: number;
    type: FeroziType;
    nature: FeroziNature;
    meta: string;
    popup?: Popup;
    maxCapacity: number;
};

export function AddFerozi() {
    const { currentFerozi }: IFerozisState = useAppSelector<IFerozisState>(
        (state) => state.ferozi
    );

    const dispatch = useAppDispatch();
    const form = useForm<FormValues>({
        initialValues: {
            maxCapacity: currentFerozi?.maxCapacity ?? 0,
            name: currentFerozi?.name ?? '',
            sqlQuery: currentFerozi?.sqlQuery ?? '',
            passPercentage: currentFerozi?.passPercentage ?? 1,
            type: (currentFerozi?.type as FeroziType) ?? FeroziType.OTHER,
            nature: (currentFerozi?.nature as FeroziNature) ?? FeroziNature.OPTIMISTIC,
            meta: currentFerozi?.type === FeroziType.INAPP_POPUP ? (currentFerozi?.metaData ?? '') : JSON.stringify(currentFerozi?.metaData ?? {}),
            popup:
                currentFerozi?.type === FeroziType.INAPP_POPUP
                    ? new Popup(currentFerozi?.metaData)
                    : undefined,
        },
        validate: {
            passPercentage: (value) => {
                if (value < 1 || value > 100) {
                    return 'Pass percentage should be between 1 to 100';
                }
                return null;
            },
            maxCapacity: (value) => {
                if (value < 1) {
                    return 'Max capacity should be greater than 1';
                }
                return null;
            },
        },
    });

    const [loading, setIsLoading] = useState(false);
    const uploadIllustration = async (
        illustration: File | string | undefined
    ): Promise<string | undefined> => {
        if (!illustration) {
            return '';
        }
        if (illustration instanceof File) {
            const response = await dispatch(
                createAsset({
                    file: illustration,
                })
            )
                .unwrap();
            return response?.url;
        }
        return illustration;
    };

    const router = useRouter();

    const onSubmit = async (_values: FormValues) => {
        setIsLoading(true);
        const illustrationUrl = await uploadIllustration(_values.popup?.illustration);
        const values = {
            ..._values,
            meta: {
                ..._values.popup,
                illustration: illustrationUrl,
            },
        };

        if (!illustrationUrl) {
            delete values.meta.illustration;
        }

        await dispatch(
            manageFerozi({
                id: currentFerozi?.id,
                name: values.name,
                sqlQuery: values.sqlQuery,
                passPercentage: Number(values.passPercentage),
                maxCapacity: Number(values.maxCapacity),
                type: values.type,
                nature: values.nature,
                metaData: values.meta,
                isActive: currentFerozi?.isActive ?? true,
            } as ManageFeroziRequestDto)
        )
            .unwrap();

        router.push('/admin/ferozis');
        dispatch(listFerozis);
        setIsLoading(false);
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={8} pb={25}>
                <Group justify="space-between">
                    <Title fz="xl">{currentFerozi ? 'Edit Ferozi' : 'Create Ferozi'}</Title>
                    <Group>
                        {currentFerozi && <DeleteFerozi />}
                        <Button
                          type="submit"
                          color="yellow"
                          loading={loading}
                          leftSection={currentFerozi ? <CiEdit /> : undefined}
                          rightSection={currentFerozi ? undefined : '🚀'}
                        >
                            {currentFerozi ? 'Edit Ferozi' : 'Publish'}
                        </Button>
                    </Group>
                </Group>
                <Grid grow gutter="xl">
                    <Grid.Col span={4}>
                        <Stack gap={16}>

                            <Group align="end" grow>
                                <TextInput
                                  placeholder="Ferozi name"
                                  label="Ferozi Name"
                                  required
                                  {...form.getInputProps('name')}
                                />
                            </Group>
                            <Textarea
                              required
                              placeholder="SELECT * FROM USER...."
                              label="Superset Query"
                              {...form.getInputProps('sqlQuery')}
                            />
                            <Text size="sm" fw={500} lh={0.2} mt={4}> Ferozi Division</Text>
                            <Group>
                                <NumberInput
                                  min={1}
                                  required
                                  max={100}
                                  {...form.getInputProps('passPercentage')}
                                  placeholder="-"
                                />
                                <Text>Pass</Text>
                                <NumberInput value={100 - form.values.passPercentage} disabled />
                                <Text>Fail</Text>
                            </Group>
                            <Text size="sm" fw={500} lh={0.2} mt={4}> Experiment Nature </Text>
                            <SegmentedControl
                              {...form.getInputProps('nature')}
                              data={[
                                    {
                                        value: FeroziNature.OPTIMISTIC,
                                        label: (<Center>
                                            <IconEye />
                                            <Box ml={10}>Optimistic</Box>
                                                </Center>),
                                    },
                                    {
                                        value: FeroziNature.PESSIMISTIC,
                                        label: (
                                            <>
                                                <Center>
                                                    <IconEyeClosed />
                                                    <Box ml={10}>Pessimistic</Box>
                                                </Center>
                                            </>
                                        ),
                                    },
                                ]}
                              color="yellow"
                            />
                            <Paper shadow="xs" p="sm" withBorder>
                                <Group gap={10}>
                                    {form.values.nature === 'PESSIMISTIC' && <IconEyeClosed size={16} />}
                                    {form.values.nature === 'OPTIMISTIC' && <IconEye size={16} />}
                                    <Text
                                      size="sm"
                                      fw={500}
                                    > {form.values.nature === 'PESSIMISTIC' ? 'Pessimistic' : 'Optimistic'} Nature
                                        Description
                                    </Text>
                                </Group>
                                {form.values.nature === FeroziNature.PESSIMISTIC && (
                                    <Stack>
                                        <Text size="sm" mt={10}>
                                            The ferozi will be shown to users until total
                                            count treatment and control, irrespective of
                                            acknoledgement reach the max capacity.
                                        </Text>
                                        <Text size="sm" fw={600}>
                                            The ferozi will be visible to less users
                                        </Text>
                                    </Stack>

                                )}
                                {form.values.nature === FeroziNature.OPTIMISTIC && (
                                    <Stack>
                                        <Text size="sm" mt={10}>
                                            This ferozi will be shown to users until the
                                            count of acknoledgement of the users reaches
                                            the max capacity.
                                        </Text>
                                        <Text size="sm" fw={600}>
                                            The ferozi will be visible to more users
                                        </Text>
                                    </Stack>

                                )}
                            </Paper>
                            <NumberInput
                              label="Max Capacity"
                              min={1}
                              required
                              {...form.getInputProps('maxCapacity')}
                              placeholder="-"
                            />
                            <Select
                              label="Types"
                              required
                              placeholder="Pick one"
                              {...form.getInputProps('type')}
                              data={[
                                    { value: FeroziType.INAPP_POPUP, label: 'In App Popup' },
                                    {
                                        value: FeroziType.OTHER,
                                        label: 'Other',
                                    },
                                ]}
                            />
                            {form.values.type === FeroziType.INAPP_POPUP && (
                                <ManagePopup
                                  popup={form.values.popup}
                                  onUpdate={(data) => {
                                        form.setFieldValue('popup', data);
                                    }}
                                />
                            )}
                            {form.values.type !== FeroziType.INAPP_POPUP && (
                                <Textarea {...form.getInputProps('meta')} />
                            )}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Stack gap={16}>
                            {form.values.popup && form.values.type === FeroziType.INAPP_POPUP && (
                                <FeroziPopup popup={form.values.popup} />
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form>
    );
}
