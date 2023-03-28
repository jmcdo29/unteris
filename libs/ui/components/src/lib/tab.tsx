import MuiTab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material';

export const Tab = styled(MuiTab)<TabProps>(() => {
  return {
    alignItems: 'start',
  };
});
