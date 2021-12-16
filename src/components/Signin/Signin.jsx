import { Component } from "react";

export class Signin extends Component {

	constructor(props) {

		super(props)
		this.state = {
			signEmail: "",
			signInPassword: "",
		}
	}

	onEmailChange = event => {
		this.setState({signEmail: event.target.value});
	}

	onPasswordChange = event => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch(`${this.props.url}/signin`, {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.signEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange("home")
			}
		})
	}

	render() {

		const { onRouteChange } = this.props;

		return (
		
			<article className="border border-gray-900 border-opacity-29 rounded mx-auto w-2/3 sm:w-1/2 lg:w-1/4" >
				<h1 className="font-bold text-3xl mt-6">Sign In</h1>
				<div className="px-4 max-w-lg mx-auto">
					<div>
						<div className="my-6">
								<label htmlFor="email" className="text-lg font-semibold text-gray-900 block mb-2">Email</label>
								<input onChange={this.onEmailChange} type="email" id="email" className="bg-gray-50 border mx-auto border-gray-300 text-gray-900 md:text-lg rounded-lg block w-full p-2 md:w-2/3" placeholder="mail@example.com" required="" />
						</div>
						<div className="mb-6">
								<label htmlFor="password" className="text-lg font-semibold text-gray-900 block mb-2">Password</label>
								<input onChange={this.onPasswordChange} type="password" id="password" className="bg-gray-50 border mx-auto border-gray-300 text-gray-900 md:text-lg rounded-lg block w-full p-2 md:w-2/3" placeholder="********" required="" />
						</div>
						<button
							type="submit"
							className="text-white bg-blue-400 hover:bg-opacity-70 hover:underline transform transition duration-300 active:scale-95 md:text-lg font-medium rounded-lg text-md px-5 p-2 text-center"
							onClick={this.onSubmitSignIn}
							>
								Sign In
							</button>
						</div>
					</div>
				<button onClick={() => onRouteChange("register")} type="button" className="font-bold text-lg text-gray-900 my-6 transition transform hover:underline hover:text-gray-100 active:scale-95">Register</button>
			</article>
		);
	}
}