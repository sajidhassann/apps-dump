import { Flex, Text } from '@mantine/core';

export type FooterPropTypes = {
  appName: string;
  copyright: string;
};

export default function CustomFooter(props: FooterPropTypes) {
  return (
    <Flex justify="space-between" wrap="wrap">
      <Text fz="xs">{props?.appName}</Text>
      <Text fz="xs">{props?.copyright}</Text>
    </Flex>
  );
}
