import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, Tooltip, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LocationWithImage } from "@unteris/shared/types";
import { Image, Lorem, TextInput, memoAtom, sdk } from "@unteris/ui/components";

interface LocationEditProps {
	details: LocationWithImage;
	titleSize?: string;
	setEditing: (editing: boolean) => void;
	setDetail: (detail: LocationWithImage) => void;
}

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export const LocationEdit = ({
	details: locationDetail,
	setDetail,
	setEditing,
}: LocationEditProps) => {
	const [name, setName] = memoAtom(locationDetail.name, [locationDetail]);
	const [description, setDescription] = memoAtom(locationDetail.description, [
		locationDetail,
	]);

	const fileReader = new FileReader();

	const [imageUrl, setImageUrl] = memoAtom(locationDetail.imageUrl, [
		locationDetail,
	]);

	const [imageData, setImageData] = memoAtom<File | undefined, []>(
		undefined,
		[],
	);

	const saveLocation = async () => {
		await sdk.updateLocation(
			locationDetail.id,
			{ name, description: description ?? "" },
			imageData,
		);
		setEditing(false);
		setDetail({
			...locationDetail,
			name,
			description,
			imageUrl,
		});
	};

	return (
		<>
			<Grid container justifyContent="center" columns={1} xs={1}>
				<TextInput
					value={name}
					label="Name"
					onUpdate={(e) => setName(e.target.value)}
					fullWidth
				/>
			</Grid>

			<TextInput
				value={description ?? ""}
				label="Description"
				multiline
				onUpdate={(e) => setDescription(e.target.value)}
				fullWidth
			/>
			<Image
				src={imageUrl}
				alt={`The ${name} ${locationDetail.type}, pulled from a portion of the full Unteris map`}
			/>
			<Button
				component="label"
				variant="contained"
				startIcon={<CloudUploadIcon />}
			>
				Upload file
				<VisuallyHiddenInput
					type="file"
					onChange={(e) => {
						if (!e.target.files) {
							return;
						}
						setImageData(e.target.files[0]);

						fileReader.onload = (e) => {
							setImageUrl(e.target?.result?.toString() ?? null);
						};
						fileReader.readAsDataURL(e.target.files[0]);
					}}
				/>
			</Button>
			<Tooltip title={`Save ${name}`}>
				<IconButton onClick={saveLocation}>
					<SaveIcon /> Save
				</IconButton>
			</Tooltip>
		</>
	);
};
