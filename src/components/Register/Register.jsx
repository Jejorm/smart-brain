import { Component } from "react";

export class Register extends Component {

	constructor(props) {

		super(props)
		this.state = {
			name: "",
			email: "",
			password: "",
		}
	}

	onNameChange = event => {
		this.setState({name: event.target.value});
	}

	onEmailChange = event => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = event => {
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () => {
		fetch(`${this.props.url}/register`, {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
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

		return (
		
			<article className="border border-gray-900 border-opacity-29 rounded mx-auto w-2/3 sm:w-1/2 lg:w-1/4" >
				<h1 className="font-bold text-3xl mt-6">Register</h1>
				<div className="px-4 max-w-lg mx-auto">
					<div>
						<div className="mt-6">
								<label htmlFor="name" className="text-lg font-semibold text-gray-900 block mb-2">Name</label>
								<input onChange={this.onNameChange} type="text" id="name" className="bg-gray-50 border mx-auto border-gray-300 text-gray-900 md:text-lg rounded-lg block w-full p-2 md:w-2/3" placeholder="Your Name" required="" />
						</div>
						<div className="my-6">
								<label htmlFor="email" className="text-lg font-semibold text-gray-900 block mb-2">Email</label>
								<input onChange={this.onEmailChange} type="email" id="email" className="bg-gray-50 border mx-auto border-gray-300 text-gray-900 md:text-lg rounded-lg block w-full p-2 md:w-2/3" placeholder="mail@example.com" required="" />
						</div>
						<div className="mb-6">
								<label htmlFor="password" className="text-lg font-semibold text-gray-900 block mb-2">Password</label>
								<input onChange={this.onPasswordChange} type="password" id="password" className="bg-gray-50 border mx-auto border-gray-300 text-gray-900 md:text-lg rounded-lg block w-full p-2 md:w-2/3" placeholder="*******" required="" />
						</div>
						<button
							type="submit"
							className="mb-6 text-white bg-blue-400 hover:bg-opacity-70 hover:underline transform transition duration-300 active:scale-95 md:text-lg font-medium rounded-lg text-md px-5 p-2 text-center"
							onClick={this.onSubmitRegister}
							>
								Register	
							</button>
					</div>
				</div>
			</article>
		);
	}
}