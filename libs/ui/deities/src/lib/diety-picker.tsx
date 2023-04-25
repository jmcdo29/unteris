import Tabs from '@mui/material/Tabs';
import {
  Grid,
  a11yProps,
  Tab,
  TabPanel,
  useFetchEffect,
} from '@unteris/ui/components';
import { SyntheticEvent, useState } from 'react';
import { Deity } from './deity';

interface DeityPickerProps {
  location: { name: string; id: string };
}

export const DeityPicker = (props: DeityPickerProps): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(-1);
  const [deities, setDeities] = useState<Array<{ name: string; id: string }>>(
    []
  );

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  useFetchEffect({
    endpoint: `deities/location/${props.location.id}`,
    setter: setDeities,
    default: [],
  });

  return (
    <Grid columns={12}>
      <Tabs
        orientation="vertical"
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="vertical deity tab picker"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          alignItems: 'start',
          overflow: 'unset',
          gridColumn: 'span 2',
        }}
      >
        {deities.map((deity, index) => (
          <Tab label={deity.name} key={index} {...a11yProps(index)}></Tab>
        ))}
      </Tabs>
      {deities.map((deity, index) => (
        <TabPanel
          value={tabIndex}
          index={index}
          key={index}
          gridColumn="span 10"
        >
          <Deity deity={deity} />
        </TabPanel>
      ))}
    </Grid>
  );
};
