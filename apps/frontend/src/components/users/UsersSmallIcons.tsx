import Image from "next/image";

export const UsersSmallIcons = ({ usersImages }: { usersImages: string[] }) => (
	<div className="flex items-center justify-center">
		{usersImages.map((url, index) => (
			<div
				key={index}
				className="w-8 h-8 -ml-2 rounded-full overflow-hidden border-2 border-white"
			>
				<Image
					src={url}
					height={50}
					width={50}
					className="w-full h-full object-cover"
					alt={"Member 1"}
				/>
			</div>
		))}
	</div>
);
