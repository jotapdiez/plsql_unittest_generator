import React, { useContext, useEffect} from 'react';
// import { Form } from 'react-bootstrap';
import {
    Accordion, Segment,
} from 'semantic-ui-react'
import { UnitTestContext } from '../context/UnitTestContext';
import {
    options,
} from '../constants'
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import "prismjs/themes/prism-tomorrow.css";

function General() {
    const unitTest = useContext(UnitTestContext);
    const startupPanels = unitTest.startups.map(item => {
        return {
            key: item.id, title: item.label, content: { content: (<pre><code className={`language-sql`}>{item.content}</code></pre>) } }
    })
    const startupContent = (
            <Accordion.Accordion panels={startupPanels} />
    )

    const paramsPanels = unitTest.parameters.map(item => {
        return { key: item.id, title: item.parameter, content: `${item.inout}: ${item.input} (TestResult: ${item.testResult})` }
    })

    const paramsContent = paramsPanels.length > 0 ? (<Accordion.Accordion panels={paramsPanels} />) : (<div>No hay parametros</div>);

    const validationsPanels = unitTest.validations.map(item => {
        let content = {
            content: (<>
                <div>{options.filter(i => i.id === item.optionId)[0].label}:</div><br/>
                <pre><code className={`language-sql`}>{item.content}</code></pre><br />
                {item.contentTarget !== '' ? <pre><code className={`language-sql`}>{item.contentTarget}</code></pre> : null}
            </>)
        };
        return {
            key: item.id, title: item.label, content: content}
    })

    const validationsContent = (
            <Accordion.Accordion panels={validationsPanels} />
    )
    const teardownPanels = unitTest.teardowns.map(item => {
        return {
            key: item.id, title: item.label, content: { content: (<pre><code className={`language-sql`}>{item.content}</code></pre>) }}
    })

    const teardownContent = (
            <Accordion.Accordion panels={teardownPanels} />
    )
    const rootPanels = [
        { key: 'panel-Startup', title: 'Startup', content: { content: startupContent } },
        { key: 'panel-Params', title: 'Params', content: { content: paramsContent } },
        { key: 'panel-Validations', title: 'Validations', content: { content: validationsContent } },
        { key: 'panel-Teardown', title: 'Teardown', content: { content: teardownContent } },
    ]

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (<Segment>
        <Accordion defaultActiveIndex={0} panels={rootPanels} styled fluid />
    </Segment>);
}

export default General;
