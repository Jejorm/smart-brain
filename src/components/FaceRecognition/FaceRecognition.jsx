import "./FaceRecognition.css";

export const FaceRecognition = ({ imageUrl, boxes }) => {

	return (
		<div className="my-8 mx-auto w-1/2 flex justify-center items-center">
			<div className={`relative`}>
				<img id="inputimage" src={imageUrl} alt="" className="" />
				{
					boxes.map((box, i) => {

						const { topRow, rightCol, bottomRow, leftCol } = box

						return (<div
							key={i}
							className="bounding-box"
							style={{
								top: topRow,
								right: rightCol,
								bottom: bottomRow,
								left: leftCol
							}}
						>
						</div>)
					})
				}
			</div>
		</div>
	);
}