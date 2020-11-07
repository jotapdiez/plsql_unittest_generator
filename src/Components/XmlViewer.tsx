import React, {useEffect } from 'react'
// import Editor from 'react-simple-code-editor'
// import Highlight, { defaultProps } from 'prism-react-renderer'
// import theme from 'prism-react-renderer/themes/nightOwl'
import Prism from 'prismjs';
// import , { highlight, languages, Grammar } from 'prismjs';
import 'prismjs/components/prism-sql';
// import 'prismjs/components/prism-css';
// import 'prismjs/themes/prism-dark.css';
// import 'prismjs/components/prism-http';
import "prismjs/themes/prism-tomorrow.css";

type XmlViewerProps = {
    xml: string;
}

// const styles = {
//     root: {
//         boxSizing: 'border-box',
//         fontFamily: '"Dank Mono", "Fira Code", monospace',
//         ...theme.plain
//     }
// }

const XmlViewer = function (props: XmlViewerProps) {
    // const [code, setCode] = useState(props.xml); const editorRef = useRef(null);
    // const { defaultValue, fieldName, registerField, error } = useField('editorxxx1');
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    // const onValueChange = (code:string) => {
    //     setCode(code)
    // }

    return (<>
        {/* <Editor
            className="editor"
            textareaId={'editorxxx1'}
            value={code}
            defaultValue={'<xml>no code</xml>'}
            onValueChange={setCode}
            highlight={(code: string) => highlight(code, Prism.languages.markup, 'html')}
            padding={15}
            ref={editorRef}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                boxSizing: 'border-box',
            }}
        /> */}
        <div>
            <pre>
                <code className={`language-sql`}>{props.xml}</code>
            </pre>
        </div>
    </>);
}
export default XmlViewer;