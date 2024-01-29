import { FileInput, Group, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { IconFolderFilled } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

export enum LinkAction {
   CLOSE = 'close',
   DEEPLINK = 'deeplink',
}

export class Popup {
   body?: string;
   headline?: string;
   buttonPrimaryText?: string;
   buttonPrimaryAction?: string;
   buttonPrimaryLink?: string;
   buttonSecondaryText?: string;
   buttonSecondaryAction?: string;
   buttonSecondaryLink?: string;
   illustration?: string | File;

   constructor(data: Popup | undefined) {
      try {
         this.body = data?.body;
         this.headline = data?.headline;
         this.buttonPrimaryText = data?.buttonPrimaryText;
         this.buttonPrimaryAction = data?.buttonPrimaryAction ?? LinkAction.CLOSE;
         this.buttonPrimaryLink = data?.buttonPrimaryLink;
         this.buttonSecondaryText = data?.buttonSecondaryText;
         this.buttonSecondaryAction = data?.buttonSecondaryAction;
         this.buttonSecondaryLink = data?.buttonSecondaryLink;
         this.illustration = data?.illustration;
      } catch (e) {
         console.log('failed to parse', e);
      }
   }
}

export interface ManagePopupProps {
   popup?: Popup
   onUpdate: ((value: Popup) => void)
}

export function ManagePopup(props: ManagePopupProps) {
   const form = useForm<Popup>({
      initialValues: props.popup,
   });

   const cleanData = () => {
      const data: { [key: string]: any } = {};
      const values = form.values as { [key: string]: any };
      const keys = Object.keys(form.values);

      keys.forEach(key => {
         if ((values[key]?.length ?? 0) > 0 || values[key] instanceof File) {
            data[key] = values[key];
         }
      });

      if (data.buttonPrimaryAction === LinkAction.CLOSE) {
         delete data.buttonPrimaryLink;
      }

      if (!data.buttonSecondaryText || data.buttonSecondaryText.length === 0) {
         delete data.buttonSecondaryAction;
         delete data.buttonSecondaryLink;
      }

      if (data.buttonSecondaryAction === LinkAction.CLOSE) {
         delete data.buttonSecondaryLink;
      }

      console.log('cleaned data', data);
      return data;
   };

   useEffect(() => {
      props.onUpdate(cleanData());
   }, [form.values]);

   return (<form><Stack>
      <TextInput
        required
        {...form.getInputProps('headline')}
        placeholder="Enter heading"
        label="Headline"
      />
      <Textarea
        {...form.getInputProps('body')}
        placeholder="Enter body text"
        label="Body (Optional)"
      />
      <Group grow>
         <TextInput
           required
           {...form.getInputProps('buttonPrimaryText')}
           placeholder="Enter button text"
           label="Primary Button Text"
         />
         <Select
           required
           {...form.getInputProps('buttonPrimaryAction')}
           label="Primrary Button Action"
           placeholder="Pick value"
           data={[LinkAction.CLOSE, LinkAction.DEEPLINK]}
         />
      </Group>
      {form.values.buttonPrimaryAction === LinkAction.DEEPLINK && (
         <TextInput
           required
           {...form.getInputProps('buttonPrimaryLink')}
           placeholder="Enter button text"
           label="Primary Button Link"
         />
      )}
      <Group grow>
         <TextInput
           {...form.getInputProps('buttonSecondaryText')}
           placeholder="Enter button text"
           label="Secondary Button Text"
         />
         {form.values.buttonSecondaryText && (
            <Select
              required
              {...form.getInputProps('buttonSecondaryAction')}
              label="Secondary Button Action"
              placeholder="Pick value"
              data={[LinkAction.CLOSE, LinkAction.DEEPLINK]}
            />
         )}
      </Group>
      {form.values.buttonSecondaryAction === LinkAction.DEEPLINK && (
         <TextInput
           required
           {...form.getInputProps('buttonSecondaryLink')}
           placeholder="Enter button text"
           label="Secondary Button Link"
         />
      )}
      <FileInput
        {...form.getInputProps('illustration')}
        placeholder="Pick file"
        label="Illustration (Optional)"
        rightSectionWidth={125}
        rightSection={
            <>
               <IconFolderFilled style={{ color: '#FFB547' }} />
               <Text ml={4} size="xs" fw={500}>
                  Browse Files
               </Text>
            </>
         }
      />
                 </Stack>
           </form>);
}
