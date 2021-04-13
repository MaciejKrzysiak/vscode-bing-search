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

async function queryBing(query) {
	if (query != undefined && query != null && query.trim() != "") {
		vscode.env.openExternal("https://www.bing.com/search?q=" + query.trim());
	} else {
		vscode.window.showInformationMessage(empty_query);
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	vscode.commands.executeCommand('setContext', 'bing-search.viewCommandPaletteBingSearchInCommandPalette', true);
	vscode.commands.executeCommand('setContext', 'bing-search.viewEditorContextMenuBingSearchInCommandPalette', false);
	vscode.commands.executeCommand('setContext', 'bing-search.viewkeyBindedDecision', true);

	let bingSearchDisposable = vscode.commands.registerCommand('bing-search.commandPaletteBingSearch', async function () {
		var query = await showInputBox()
		queryBing(query)
	});

	let editorContextMenuBingSearchDisposable = vscode.commands.registerCommand('bing-search.editorContextMenuBingSearch', async function () {
		var query = editor.document.getText(editor.selection);
		queryBing(query)
	});

	let keyBindedDecisionDisposable = vscode.commands.registerCommand('bing-search.keyBindedDecision', async function () {
		query = editor.document.getText(editor.selection);
		if (query != undefined && query != null && query.trim() != "") {
			queryBing(query)
		} else {
			var query = await showInputBox()
			queryBing(query)
		}
	});
  
	context.subscriptions.push(bingSearchDisposable);
	context.subscriptions.push(editorContextMenuBingSearchDisposable);
	context.subscriptions.push(keyBindedDecisionDisposable)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
