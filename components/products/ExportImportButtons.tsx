"use client";

import React, { useState } from 'react';
import { Button, InlineStack, ActionList, Popover } from '@shopify/polaris';
import { MobileHorizontalDotsMajor } from '@shopify/polaris-icons';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

export default function ExportImportButtons() {
  const [popoverActive, setPopoverActive] = useState(false);

  const exportAction = () => {
    // Logic for Export action
  };

  const importAction = () => {
    // Logic for Import action
  };

  const togglePopover = () => {
    setPopoverActive(!popoverActive);
  };

  const closePopover = () => {
    setPopoverActive(false);
  };

  return (
    <AppProvider i18n={enTranslations}>
      <div className="hidden sm:block">
        <InlineStack gap="100">
          <Button onClick={exportAction}>Export</Button>
          <Button onClick={importAction}>Import</Button>
        </InlineStack>
      </div>

      <div className="sm:hidden">
        <Popover
          active={popoverActive}
          activator={<Button icon={MobileHorizontalDotsMajor} onClick={togglePopover} />}
          onClose={closePopover}
        >
          <ActionList
            items={[
              { content: 'Export', onAction: exportAction },
              { content: 'Import', onAction: importAction },
            ]}
          />
        </Popover>
      </div>
    </AppProvider>
  );
}
