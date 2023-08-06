import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import { Suspense, SyntheticEvent } from 'react';
import { a11yProps } from './a11y.props';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';

interface TabsWithPanelProps {
  ariaLabel: string;
  tabIndex: number;
  handleTabChange: (_event: SyntheticEvent, newIndex: number) => void;
  tabElements: Array<{ id: string; name: string }>;
  tabPanelContent: (prop: any) => JSX.Element;
  indicator?: 'primary' | 'secondary';
}

export const TabsWithPanel = (props: TabsWithPanelProps): JSX.Element => {
  const isWideEnough = useMediaQuery('(min-width:600px)');
  return (
    <Grid
      container={true}
      wrap={isWideEnough ? 'nowrap' : 'wrap'}
      flexShrink={0}
      columns={isWideEnough ? 12 : 1}
    >
      <Tabs
        orientation={isWideEnough ? 'vertical' : 'horizontal'}
        value={props.tabIndex}
        onChange={props.handleTabChange}
        aria-label={props.ariaLabel}
        indicatorColor={props.indicator ?? 'primary'}
        textColor={props.indicator ?? 'primary'}
        variant={isWideEnough ? 'standard' : 'scrollable'}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          alignItems: isWideEnough ? 'start' : 'center',
          overflow: isWideEnough ? 'unset' : 'hidden',
        }}
      >
        {props.tabElements.map((tab, index) => (
          <Tab {...a11yProps(index)} label={tab.name} key={tab.id} />
        ))}
      </Tabs>
      {props.tabElements.map((tab, index) => (
        <TabPanel value={props.tabIndex} index={index} key={index}>
          <Suspense>{props.tabPanelContent(tab)}</Suspense>
        </TabPanel>
      ))}
    </Grid>
  );
};
