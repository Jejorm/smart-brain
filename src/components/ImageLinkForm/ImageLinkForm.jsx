import "./ImageLinkForm.css";

export const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {

	return (
		<div className="grid grid-cols-1 gap-5 m-5 md:gap-10 md:my-10 lg:my-16 lg:gap-16">
			<p className="text-lg text-gray-900 md:text-xl lg:text-3xl">
				{"This Magic Brain will detect faces in your pictures. Give it a try."}
			</p>
			<div className="form mx-auto p-4 rounded-lg max-w-lg lg:w-1/2">
				<input
					type="text"
					className="bg-gray-50 border text-lg p-2 w-2/3"
					onChange={onInputChange} />
				<button
					className="px-auto py-2 text-lg mx-auto w-1/3 text-white bg-purple-500 transition transform hover:underline hover:opacity-95 active:scale-95"
					onClick={onButtonSubmit}
				>
					Detect
				</button>
			</div>
		</div>
	);
}