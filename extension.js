const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;
const empty_query = "Failed to search an empty query."

async function showInputBox() {
	const query = await vscode.window.showInputBox({
		value: "",
		placeHolder: "cat playing drums"
	});

	return query;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	vscode.commands.executeCommand('setContext', 'bingSearch.viewCommandPaletteBingSearchInCommandPalette', true);
	vscode.commands.executeCommand('setContext', 'bingSearch.viewEditorContextMenuBingSearchInCommandPalette', false);

	let bingSearchDisposable = vscode.commands.registerCommand('bing-search.commandPaletteBingSearch', async function () {
		var query = await showInputBox()
		if (query != undefined && query != null && query.trim() != "") {
			vscode.env.openExternal("https://www.bing.com/search?q=" + query);
		} else {
			vscode.window.showInformationMessage(empty_query);
		}
	});

	let editorContextMenuBingSearchDisposable = vscode.commands.registerCommand('bing-search.editorContextMenuBingSearch', async function () {
		var query = editor.document.getText(editor.selection);
		if (query != undefined && query != null && query.trim() != "") {
			vscode.env.openExternal("https://www.bing.com/search?q=" + query);
		} else {
			vscode.window.showInformationMessage(empty_query);
		}
	});
  
	context.subscriptions.push(bingSearchDisposable);
	context.subscriptions.push(editorContextMenuBingSearchDisposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
