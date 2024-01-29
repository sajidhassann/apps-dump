import { Center, Loader, LoadingOverlay, Stack } from '@mantine/core';
import { Header } from '@components/ferozis/Analytics/Header';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dashboard } from '@components/ferozis/Analytics/Dashboard';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { IFerozisState, listFerozis } from '@/src/application/redux/features/ferozis';

export function AnalyticsDashboard() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();

    const { ferozis }: IFerozisState = useAppSelector<IFerozisState>((state) => state.ferozi);

    const [selectedFeroziID, setSelectedFeroziID] = useState<null | string>(null);
    const [selectedFeroziName, setSelectedFeroziName] = useState<null | string>(null);

    useEffect(() => {
        dispatch(listFerozis());
    }, []);

    const router = useRouter();
    useEffect(() => {
        if ((ferozis?.length ?? 0) <= 0) {
            return;
        }
        if (searchParams?.get('id') == null) {
            const ferozi = ferozis?.[0]?.id;
            router.replace(`analytics?id=${ferozi}`);
        }
    }, [ferozis]);

    useEffect(() => {
        const feroziID = searchParams?.get('id');
        setSelectedFeroziID(feroziID ?? null);
        setSelectedFeroziName(ferozis?.find(ferozi => ferozi.id === feroziID)?.name ?? null);
    }, [searchParams, ferozis]);

    if (ferozis == null) {
        return <LoadingOverlay />;
    }

    return (
        <Stack gap={0}>
            <Header selectedFeroziID={selectedFeroziID} selectedFeroziName={selectedFeroziName} ferozis={ferozis} />
            {selectedFeroziID != null && <Dashboard feroziID={selectedFeroziID} />}
            {selectedFeroziID == null && <Loader />}
        </Stack>
    );
}
