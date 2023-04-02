import Tabs from '@mui/material/Tabs';
import {
  Grid,
  Tab,
  TabPanel,
  a11yProps,
  useFetchEffect,
} from '@unteris/ui/components';
import { SyntheticEvent, useState } from 'react';
import { DeityPicker } from './diety-picker';

export const DeityNav = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(-1);
  const [categories, setCategories] = useState<
    Array<{ name: string; id: string }>
  >([]);

  useFetchEffect({
    endpoint: 'deities/categories',
    setter: setCategories,
    default: [],
  });

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Grid columns={12}>
      <Tabs
        orientation="vertical"
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="vertical deity category tab picker"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          alignItems: 'start',
          gridColumn: 'span 2',
          overflow: 'unset',
        }}
      >
        {categories.map((category, index) => (
          <Tab {...a11yProps(index)} label={category.name} key={category.id} />
        ))}
      </Tabs>
      {categories.map((category, index) => (
        <TabPanel
          value={tabIndex}
          index={index}
          key={index}
          gridColumn="span 10"
        >
          <DeityPicker category={category} />
        </TabPanel>
      ))}
    </Grid>
  );
};
