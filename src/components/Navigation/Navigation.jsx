export const Navigation = ({ onRouteChange, isSignedIn }) => {

	if (isSignedIn) {
		return (
			<nav className="flex justify-end">
				<button
					type="button"
					className="mb-4 text-lg p-4 pb-0 underline cursor-pointer transform transition duration-200 hover:text-gray-200 active:scale-95 md:text-2xl lg:text-3xl "
					onClick={() => onRouteChange("signout")}
				>
					Sign Out
				</button>
			</nav>
		)
	} else {
		return (
			<nav className="flex justify-end">
				<button
					type="button"
					className="mb-4 text-lg p-4 pb-0 underline cursor-pointer transform transition duration-200 hover:text-gray-200 active:scale-95 md:text-2xl lg:text-3xl "
					onClick={() => onRouteChange("signin")}
				>
					Sign In 
				</button>
				<button
					type="button"
					className="mb-4 text-lg p-4 pb-0 underline cursor-pointer transform transition duration-200 hover:text-gray-200 active:scale-95 md:text-2xl lg:text-3xl "
					onClick={() => onRouteChange("register")}
				>
					Register
				</button>
			</nav>
		)
	}
}