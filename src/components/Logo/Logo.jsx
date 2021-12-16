import Tilty from 'react-tilty';
import "./logo.css";
import brain from "./brain.png"

export const Logo = () => {
	
	return (
		<div className="flex justify-center items-center mt-5 md:m-10 lg:block">
			<Tilty className="tilty-conf rounded-l w-36 h-36 lg:w-44 lg:h-44 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" max={75}>
				<div className="h-full flex justify-center items-center;">
					<img src={brain} alt="brain"/>
				</div>
			</Tilty>
		</div>
	);
}