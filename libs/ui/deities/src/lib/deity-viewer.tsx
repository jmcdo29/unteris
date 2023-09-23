import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Deity } from '@unteris/shared/types';
import { Image } from '@unteris/ui/components';
import { DeityDomains } from './deity-domains';

type DeityReturn = Omit<Deity, 'imageId'> & { imageUrl: string };

interface DeityViewerProps {
	deity: DeityReturn;
}

export const DeityViewer = ({
	deity,
}: // setIsEditing,
DeityViewerProps): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid container={true}>
			<Grid
				container={true}
				direction='column'
				xs={12}
				md={6}
				rowGap={theme.spacing(3)}
			>
				<Grid alignSelf='center'>
					<Typography variant='h2' fontSize='3.25rem'>
						{deity.name}

						{/*<Button onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>*/}
					</Typography>
				</Grid>
				<Grid>
					<Typography variant='body1'>{deity.description}</Typography>
				</Grid>
				<Grid>
					<DeityDomains deity={deity} />
				</Grid>
				<Box />
			</Grid>
			<Grid md={6} xs={12}>
				<Image src={deity.imageUrl} alt={deity.name} />
			</Grid>
		</Grid>
	);
};
