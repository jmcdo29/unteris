import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { editableAtom } from "@unteris/ui/atoms";
import { atom, useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

interface ObjectView<T> {
	details: T;
	[key: string]: unknown;
}

interface ObjectEdit<T> extends ObjectView<T> {
	setEditing: (editing: boolean) => void;
	setDetail: (detail: T) => void;
}

interface ObjectDetailProps<T> {
	columns?: number;
	name?: string;
	objectView: (props: ObjectView<T>) => JSX.Element;
	objectEdit: (props: ObjectEdit<T>) => JSX.Element;
	setDetail: (detail: T) => void;
	data: T;
	[key: string]: unknown;
}

export function ObjectDetail<T>(props: ObjectDetailProps<T>) {
	const { name, data, setDetail, columns, objectEdit, objectView, ...rest } =
		props;
	const [editing, setEditing] = useAtom(useMemo(() => atom(false), []));
	const userCanEdit = useAtomValue(editableAtom);
	const DisplayedComponent = editing ? objectEdit : objectView;
	const Icon = editing ? ClearIcon : EditIcon;
	const iconLabel = editing ? `Cancel edit: ${name}` : `Edit: ${name}`;
	return (
		<Grid container columns={columns ?? 12} justifyContent="center">
			{userCanEdit ? (
				<Grid xs={12} container marginRight="1em">
					<Grid flexGrow={1} />
					<Grid>
						<Tooltip title={iconLabel}>
							<IconButton
								aria-label={iconLabel}
								onClick={() => setEditing(!editing)}
								edge="end"
							>
								<Icon fontSize="small" />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			) : (
				""
			)}
			<DisplayedComponent
				details={data}
				setEditing={setEditing}
				setDetail={setDetail}
				{...rest}
			/>
		</Grid>
	);
}
