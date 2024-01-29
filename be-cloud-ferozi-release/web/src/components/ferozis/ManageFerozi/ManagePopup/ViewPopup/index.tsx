import { Button, Card, Group, Image, MantineStyleProp, Paper, Stack, Text } from '@mantine/core';
import { Popup } from '@/src/components/ferozis/ManageFerozi/ManagePopup';

export interface FeroziPopupProps {
  popup: Popup
}

export function FeroziPopup(props: FeroziPopupProps) {
  const { headline, body, buttonPrimaryText, buttonSecondaryText, illustration } = props.popup;
  const textStyles: MantineStyleProp = {
    wordBreak: 'break-word',
    color: 'black',
  };

  const getIllustration = (illustration: File | string) => {
    if (illustration instanceof File) {
      return URL.createObjectURL(illustration);
    }
    return illustration;
  };

  return (
    <>
    <Text size="sm">Preview</Text>
    <Card shadow="xl" padding={0} radius="lg">
      <Stack justify="center" align="center" gap={0} p={32}>
        {illustration && (
          <Image
            w="auto"
            h={115}
            fit="contain"
            src={getIllustration(illustration)}
            alt=""
          />
        )}
        <Paper w={300} p={24} shadow="xl" bg="white" radius="lg">
          <Stack justify="center" align="center">
            <Text fw={500} style={textStyles} size="lg">
              {headline ?? 'Heading'}
            </Text>
            {body && <Text style={textStyles}>{body}</Text>}
            <Group justify="center" w={250} grow>
              <Button style={{ color: 'white' }} color="yellow">
                {buttonPrimaryText ?? 'Button'}
              </Button>
              {buttonSecondaryText && (
                <Button style={{ color: 'white' }} color="yellow">
                  {buttonSecondaryText ?? 'Button'}
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>
      </Stack>
      </Card>
    </>
  );
}
