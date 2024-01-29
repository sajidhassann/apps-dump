// @ts-ignore
import { Meta, StoryObj } from '@storybook/react';
//@ts-ignore
import { MaqsadCard } from './index.tsx';

const meta = {
   title: 'Maqsad Card',
   component: MaqsadCard,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ['autodocs'],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes
   argTypes: {
   bg: {
      control: 'select',
      options: ['white', 'black', 'yellow'],
   },
      shadow: {
         control: 'select',
         options: ['sm', 'md', 'lg'],
      },
      radius: {
         control: 'select',
         options: ['sm', 'md', 'lg'],
      },
   },
} satisfies Meta<typeof MaqsadCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {
      // variation: MaqsadChipVariation.PRIMIARY,
      children: <div style={{ width: '100px', height: '100px' }} />,
      bg: 'white',
      shadow: 'sm',
   },
};
