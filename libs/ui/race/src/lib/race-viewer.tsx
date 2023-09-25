import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { RaceWithAbilities } from "@unteris/shared/types";

interface RaceViewerProps {
	race: RaceWithAbilities;
}

interface RaceDetailProps {
	name: string;
	detail: string;
}

const RaceDetail = ({ name, detail }: RaceDetailProps): JSX.Element => {
	return (
		<Grid>
			<Typography variant="body2" fontSize="1.5em">
				{name}
			</Typography>
			{detail.split("\\n").map((d) => (
				<Typography variant="body1" key={d}>
					{d}
				</Typography>
			))}
		</Grid>
	);
};

export const RaceViewer = ({ race }: RaceViewerProps): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid container={true}>
			<Grid
				container={true}
				direction="column"
				xs={12}
				md={6}
				rowGap={theme.spacing(3)}
			>
				<Grid alignSelf="center">
					<Typography variant="h2" fontSize="3.25rem">
						{race.name}

						{/*<Button onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>*/}
					</Typography>
				</Grid>
				<RaceDetail name="Description" detail={race.description} />
				<RaceDetail name="Creature Type" detail={race.type} />
				<RaceDetail name="Size" detail={race.sizeDescription} />
				<RaceDetail name="Age" detail={race.ageDescription} />
				<RaceDetail
					name="Speed"
					detail={`Your base walking speed is ${race.speed} feet.`}
				/>
				<RaceDetail name="Known Languages" detail={race.knownLanguages} />
				<Typography variant="body2" fontSize="2.25em">
					Features
				</Typography>
				{race.racialAbilities.map((ability) => (
					<RaceDetail
						key={ability.name}
						name={ability.name}
						detail={ability.description}
					/>
				))}
			</Grid>
		</Grid>
	);
};
