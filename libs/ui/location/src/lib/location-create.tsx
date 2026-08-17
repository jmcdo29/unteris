import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton, styled, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { sdk, serializers, type types } from "@unteris/shared/sdk";
import { client, Image, memoAtom, TextInput } from "@unteris/ui/components";
import { useAtom } from "jotai";
import { newRegionAtom } from "./atoms";

interface LocationCreateProps {
	parentLocation?: types.GetLocationByIdResponseDto;
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

export const LocationCreate = (props: LocationCreateProps) => {
	const [newLocation, setNewLocation] = useAtom(newRegionAtom);
	const [imageUrl, setImageUrl] = memoAtom("", []);
	const [imageData, setImageData] = memoAtom<File | undefined, []>(
		undefined,
		[],
	);
	const fileReader = new FileReader();

	const save = async () => {
		await sdk.serverLocationControllerCreate({
			client,
			...serializers.formDataBodySerializer.bodySerializer,
			body: { ...newLocation, image: imageData },
			headers: {
				"Content-Type": null,
			},
		});
	};
	return (
		<>
			<Grid container justifyContent={"center"} columns={1}>
				<TextInput
					value={newLocation.name ?? ""}
					label="Name"
					onUpdate={(e) =>
						setNewLocation({ ...newLocation, name: e.target.value })
					}
					fullWidth
				/>
			</Grid>
			<TextInput
				value={newLocation.description ?? ""}
				label="Description"
				onUpdate={(e) =>
					setNewLocation({ ...newLocation, description: e.target.value })
				}
				fullWidth
				multiline
			/>
			<Button
				component="label"
				variant="contained"
				startIcon={<CloudUploadIcon />}
			>
				Add Image
				<VisuallyHiddenInput
					type="file"
					onChange={(e) => {
						if (!e.target.files) {
							return;
						}
						setImageData(e.target.files[0]);

						fileReader.onload = (e) => {
							setImageUrl(e.target?.result?.toString() ?? "");
						};
						fileReader.readAsDataURL(e.target.files[0]);
					}}
				/>
			</Button>
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt={`The ${newLocation.name} ${newLocation.type}, pulled from a portion of the full Unteris map`}
				/>
			) : (
				""
			)}
			<Tooltip title={`Save ${newLocation.name}`}>
				<IconButton onClick={() => save()}>
					<SaveIcon /> Save
				</IconButton>
			</Tooltip>
		</>
	);
};
