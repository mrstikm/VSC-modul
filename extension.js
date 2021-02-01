// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('nahradit.string', function () {
		// Aktivni editor, konec pokud neni zadny
		let editor = vscode.window.activeTextEditor;
		if (!editor) return;

		// pozice selekce v editoru
		let vyber = editor.selection,
    // prevod na text
			text = editor.document.getText(vyber);

    // pokud nebylo vybrano, vybereme cely dokument
		if (text.length == 0) {
			let prvniRadek = editor.document.lineAt(0),
				posledniRadek = editor.document.lineAt(editor.document.lineCount - 1);

			// @ts-ignore
			vyber = new vscode.Range(prvniRadek.range.start, posledniRadek.range.end);
      // znovu prevedeme selekci na text
      text = editor.document.getText(vyber);
		}

		// prubeh textem a zmena "a" na "b"
		let vysledek = text.split("a").join("b");

		// zapis zmeny do editoru
		editor.edit(function (e) {
			e.replace(vyber, vysledek);
		});
		// Display a message box to the user
		vscode.window.showInformationMessage("Hotovo!");
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

