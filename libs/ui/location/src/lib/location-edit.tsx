import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, styled, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { sdk, serializers, type types } from "@unteris/shared/sdk";
import { client, Image, memoAtom, TextInput } from "@unteris/ui/components";

interface LocationEditProps {
	details: types.GetLocationByIdResponseDto;
	titleSize?: string;
	setEditing: (editing: boolean) => void;
	setDetail: (detail: types.GetLocationByIdResponseDto) => void;
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
		await sdk.serverLocationControllerUpdate({
			client,
			...serializers.formDataBodySerializer,
			path: { id: locationDetail.id },
			body: {
				name,
				description: description ?? "",
				image: imageData,
			},
			headers: {
				"Content-Type": null,
			},
		});
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
							setImageUrl(e.target?.result?.toString() ?? undefined);
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
