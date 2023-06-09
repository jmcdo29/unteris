import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@unteris/ui/components';
import { Deity } from '@unteris/shared/types';
import { ChangeEvent } from 'react';
import { useTheme } from '@mui/material';

interface DeityEditorProps {
  deity: Deity;
  setDeity: (deity: Deity) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const DeityEditor = (props: DeityEditorProps): JSX.Element => {
  const theme = useTheme();
  const deityCopy = { ...props.deity };
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const targetField = e.target.dataset.fieldid!;
    if (!['name', 'description', 'domains'].includes(targetField)) {
      return;
    }
    console.log({
      targetField: e.target.dataset.fieldid,
      value: e.target.value,
    });
    deityCopy[targetField as keyof Deity] =
      targetField === 'domains'
        ? e.target.value.split(',')
        : (e.target.value as any);
  };
  const saveChanges = () => {
    props.setIsEditing(false);
    props.setDeity(deityCopy);
  };
  const cancelChanges = () => {
    props.setIsEditing(false);
  };
  return (
    <Grid columns={12}>
      <Box
        sx={{
          gridColumn: 'span 4',
          paddingLeft: '1em',
          display: 'grid',
          gridColumnTempalte: 'fr',
          rowGap: theme.spacing(4),
        }}
      >
        <TextField
          label="Name"
          defaultValue={props.deity.name}
          id="diety-name"
          variant="standard"
          onChange={handleChange}
          inputProps={{ 'data-fieldId': 'name' }}
        />
        <TextField
          label="Description"
          defaultValue={props.deity.description}
          id="deity-description"
          variant="standard"
          multiline
          onChange={handleChange}
          inputProps={{ 'data-fieldId': 'description' }}
        />
        {/* <TextField
          label="Domains"
          defaultValue={props.deity.domains?.join(',') ?? ''}
          id="deity-domains"
          variant="standard"
          onChange={handleChange}
          inputProps={{ 'data-fieldId': 'domains' }}
        />*/}
        <Grid columns={2} sx={{ columnGap: theme.spacing(2) }}>
          <Button variant="outlined" onClick={cancelChanges}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={saveChanges}>
            Save
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};
