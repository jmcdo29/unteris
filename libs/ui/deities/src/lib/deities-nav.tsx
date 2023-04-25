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
  const [locations, setLocations] = useState<
    Array<{ name: string; id: string }>
  >([]);

  useFetchEffect({
    endpoint: 'locations',
    setter: setLocations,
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
        aria-label="vertical deity location tab picker"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          alignItems: 'start',
          gridColumn: 'span 2',
          overflow: 'unset',
        }}
      >
        {locations.map((location, index) => (
          <Tab {...a11yProps(index)} label={location.name} key={location.id} />
        ))}
      </Tabs>
      {locations.map((location, index) => (
        <TabPanel
          value={tabIndex}
          index={index}
          key={index}
          gridColumn="span 10"
        >
          <DeityPicker location={location} />
        </TabPanel>
      ))}
    </Grid>
  );
};
