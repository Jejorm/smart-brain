export const Rank = ({ name, entries }) => {

	return (
		<div className="mt-5 md:mt-10">
			<div className="text-white text-lg md:text-xl lg:text-3xl">
				{`${name}, your current entry count is ...`}
			</div>
			<div className="text-white mt-2 text-2xl md:text-3xl lg:text-5xl lg:mt-5">
				{entries}
			</div>
		</div>
	);
}