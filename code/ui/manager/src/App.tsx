import type { ComponentProps } from 'react';
import React from 'react';
import { Global, createGlobal } from '@storybook/theming';
import type { Addon_PageType } from '@storybook/types';
import Sidebar from './container/Sidebar';
import Preview from './container/Preview';
import Panel from './container/Panel';

import { Layout } from './components/layout/Layout';
import { useLayout } from './components/layout/LayoutProvider';

type Props = {
  managerLayoutState: ComponentProps<typeof Layout>['managerLayoutState'];
  setManagerLayoutState: ComponentProps<typeof Layout>['setManagerLayoutState'];
  pages: Addon_PageType[];
};

export const App = ({ managerLayoutState, setManagerLayoutState, pages }: Props) => {
  const { setMobileAboutOpen } = useLayout();

  return (
    <>
      <Global styles={createGlobal} />
      <Layout
        managerLayoutState={managerLayoutState}
        setManagerLayoutState={setManagerLayoutState}
        slotMain={<Preview id="main" withLoader />}
        slotSidebar={<Sidebar onMenuClick={() => setMobileAboutOpen((state) => !state)} />}
        slotPanel={<Panel />}
        slotPages={pages.map(({ id, render: Content }) => (
          <Content key={id} />
        ))}
      />
    </>
  );
};
