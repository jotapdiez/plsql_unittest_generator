import React, { useState } from 'react'

// import Prism, { highlight, languages } from 'prismjs';
// import Editor from 'react-simple-code-editor'
// import 'prismjs/components/prism-sql';
// import 'prismjs/components/prism-plsql';
// import 'prismjs/themes/prism-dark.css';

import { ControlledEditor } from "@monaco-editor/react";

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-mysql";
// import PLSQL from "../ace_modes/mode-plsql";
// import "ace-builds/src-noconflict/theme-github";

type SQLEditorProps = {
    id?: string;
    content: string;
}

const SQLEditor = function ({id,content}: SQLEditorProps) {
    const [code, setCode] = useState(content);
    // const editorRef = useRef(null);

    const handleEditorChange = (ev:any, value:any) => {
        setCode(value);
    };

    return (<>
        {/* <AceEditor
            value={code}
            mode={PLSQL}
            theme="github"
            onChange={(code: string) => setCode(code)}
            name={id}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                useWorker: false,
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
            }}
        /> */}
        <ControlledEditor
            height="90vh"
            value={code}
            language="pgsql"
            onChange={handleEditorChange}
            options={{
                "minimap": {
                    "enabled": false
                },
                "acceptSuggestionOnCommitCharacter": true,
                "acceptSuggestionOnEnter": "on",
                "accessibilitySupport": "off",
                "autoIndent": false,
                "automaticLayout": true,
                "codeLens": true,
                "colorDecorators": true,
                "contextmenu": true,
                "cursorBlinking": "blink",
                "cursorSmoothCaretAnimation": false,
                "cursorStyle": "line",
                "disableLayerHinting": false,
                "disableMonospaceOptimizations": false,
                "dragAndDrop": false,
                "fixedOverflowWidgets": false,
                "folding": true,
                "foldingStrategy": "auto",
                "fontLigatures": false,
                "formatOnPaste": false,
                "formatOnType": false,
                "hideCursorInOverviewRuler": false,
                "highlightActiveIndentGuide": true,
                "links": true,
                "mouseWheelZoom": false,
                "multiCursorMergeOverlapping": true,
                "multiCursorModifier": "alt",
                "overviewRulerBorder": true,
                "overviewRulerLanes": 2,
                "quickSuggestions": false,
                "quickSuggestionsDelay": 100,
                "readOnly": false,
                "renderControlCharacters": false,
                "renderFinalNewline": true,
                "renderIndentGuides": true,
                "renderLineHighlight": "all",
                "renderWhitespace": "none",
                "revealHorizontalRightPadding": 30,
                "roundedSelection": true,
                "rulers": [],
                "scrollBeyondLastColumn": 5,
                "scrollBeyondLastLine": true,
                "selectOnLineNumbers": true,
                "selectionClipboard": true,
                "selectionHighlight": true,
                "showFoldingControls": "mouseover",
                "smoothScrolling": false,
                "suggestOnTriggerCharacters": true,
                "wordBasedSuggestions": true,
                "wordSeparators": "\s+",
                "wordWrap": "on",
                "wordWrapBreakAfterCharacters": "\s+",
                "wordWrapBreakBeforeCharacters": "\s+",
                "wordWrapBreakObtrusiveCharacters": ".",
                "wordWrapColumn": 80,
                "wordWrapMinified": true,
                "wrappingIndent": "none"
            }}
        />
        {/* <Editor
            value={code}
            defaultValue={`BEGIN
                -- NO-CODE
                null;
            END;`}
            onValueChange={(code: string) => setCode(code)}
            highlight={(code: string) => highlight(code, Prism.languages.plsql, 'plsql')}
            padding={15}
            ref={editorRef}
            style={{
                fontVariantLigatures: 'common-ligatures',
                backgroundColor: '#fafafa',
                borderRadius: 3,
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                boxSizing: 'border-box',
            }}
        /> */}
        </>);
}
export default SQLEditor;