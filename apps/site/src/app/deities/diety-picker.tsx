import Tabs from '@mui/material/Tabs';
import { Grid, a11yProps, Tab, TabPanel } from '@unteris/ui/components';
import { SyntheticEvent, useState, useEffect } from 'react';
import { Deity } from './deity';

const deitiesLists: Record<string, string[]> = {
  'Empyrean Beings': ['Pomdra', 'Venlustel', 'Felvcor', 'Latubor'],
  'Empyrean Children': [],
  'Seelie Court': [],
  'Unseelie Court': [],
  Celestials: [],
  Fiends: [],
  Syrens: ['Ribbea', 'Medite', 'Abiansea', 'Erinse', 'Neromare'],
};

interface DeityPickerProps {
  category: string;
}

export const DeityPicker = (props: DeityPickerProps): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const [deities, setDeities] = useState<string[]>([]);

  const handleTabChange = (_event: SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    console.log('Rendering');
    const timeoutId = setTimeout(
      () => setDeities(deitiesLists[props.category]),
      500
    );
    return () => {
      clearTimeout(timeoutId);
      setDeities([]);
    };
  }, [setDeities]);

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
          <Tab label={deity} key={index} {...a11yProps(index)}></Tab>
        ))}
      </Tabs>
      {deities.map((deity, index) => (
        <TabPanel
          value={tabIndex}
          index={index}
          key={index}
          gridColumn="span 10"
        >
          <Deity name={deity} />
        </TabPanel>
      ))}
    </Grid>
  );
};
