// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { default: axios } = require('axios');

async function showInputBox() {
	const query = await vscode.window.showInputBox({
		value: "",
		placeHolder: "cat backflip"
	});

	return query;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bing-search" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bing-search.bingSearch', async function () {
		// The code you place here will be executed every time your command is executed
		query = await showInputBox()
		vscode.env.openExternal("https://www.bing.com/search?q=" + query)
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Bing Search!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
