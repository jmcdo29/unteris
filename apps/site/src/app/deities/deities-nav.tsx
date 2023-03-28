import Tabs from '@mui/material/Tabs';
import { Grid, Tab, TabPanel, a11yProps } from '@unteris/ui/components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { DeityPicker } from './diety-picker';

export const DeityNav = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        setCategories([
          'Divinity',
          'Empyrean Beings',
          'Empyrean Children',
          'Seelie Court',
          'Unseelie Court',
          'Celestials',
          'Fiends',
          'Syrens',
        ]),
      500
    );
    return () => {
      clearTimeout(timeoutId);
      setCategories([]);
    };
  }, [setCategories]);

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
          <Tab
            {...a11yProps(index)}
            label={category}
            key={index}
            disabled={category === 'Divinity'}
          />
        ))}
      </Tabs>
      {categories.map((category, index) => (
        <TabPanel
          value={tabIndex}
          index={index}
          key={index}
          gridColumn="span 10"
        >
          {category === 'Divinity' ? (
            <></>
          ) : (
            <DeityPicker category={category} />
          )}
        </TabPanel>
      ))}
    </Grid>
  );
};
