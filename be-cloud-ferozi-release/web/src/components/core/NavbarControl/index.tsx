import React, { useState } from 'react';
import { Burger } from '@mantine/core';

export type NavbarControlPropTypes = {
  opened: boolean;
  toggle: () => void;
};

export default function NavbarControl(props: NavbarControlPropTypes) {
  const { opened, toggle } = props;

  return (
    <Burger
      visibleFrom="sm"
      opened={opened}
      onClick={toggle}
      hiddenFrom="sm"
      size="sm"
    />
  );
}
