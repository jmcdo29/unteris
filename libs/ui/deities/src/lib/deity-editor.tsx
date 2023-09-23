import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Deity } from '@unteris/shared/types';
import { Grid } from '@unteris/ui/components';
import { useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { editingAtom } from './atoms';

type DeityReturn = Omit<Deity, 'imageId'> & { imageUrl: string };

interface DeityEditorProps {
	deity: DeityReturn;
	setDeity: (deity: DeityReturn) => void;
}

export const DeityEditor = (props: DeityEditorProps): JSX.Element => {
	const setIsEditing = useSetAtom(editingAtom);
	const theme = useTheme();
	const deityCopy = { ...props.deity };
	const handleChange = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		const targetField = e.target.dataset.fieldid ?? '';
		if (!['name', 'description'].includes(targetField)) {
			return;
		}
		deityCopy[targetField as keyof Omit<DeityReturn, 'domain'>] =
			e.target.value;
	};
	const saveChanges = () => {
		setIsEditing(false);
		props.setDeity(deityCopy);
	};
	const cancelChanges = () => {
		setIsEditing(false);
	};
	return (
		<Grid columns={12}>
			<Box
				sx={{
					gridColumn: 'span 4',
					paddingLeft: '1em',
					display: 'grid',
					gridColumnTemplate: 'fr',
					rowGap: theme.spacing(4),
				}}
			>
				<TextField
					label='Name'
					defaultValue={props.deity.name}
					id='deity-name'
					variant='standard'
					onChange={handleChange}
					inputProps={{ 'data-fieldId': 'name' }}
				/>
				<TextField
					label='Description'
					defaultValue={props.deity.description}
					id='deity-description'
					variant='standard'
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
					<Button variant='outlined' onClick={cancelChanges}>
						Cancel
					</Button>
					<Button variant='contained' color='primary' onClick={saveChanges}>
						Save
					</Button>
				</Grid>
			</Box>
		</Grid>
	);
};
