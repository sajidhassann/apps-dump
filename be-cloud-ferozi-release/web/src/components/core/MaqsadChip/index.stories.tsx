// @ts-ignore
import { Meta, StoryObj } from '@storybook/react';
//@ts-ignore
import { MaqsadChip } from './index.tsx';

const meta = {
   title: 'Maqsad Chip',
   component: MaqsadChip,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ['autodocs'],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes
   argTypes: {
      children: {
         control: 'text',
         description: 'Overwritten description',
      },
      variant: {
         control: 'select',
         options: ['outline', 'filled'],
         description: 'Overwritten description',
      },

   },
} satisfies Meta<typeof MaqsadChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {
      // variation: MaqsadChipVariation.PRIMIARY,
      children: 'Button',
      variant: 'outline',
   },
};
