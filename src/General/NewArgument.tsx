import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Checkbox,
    Form,
    Button,
    Table,
    Input,
    Select,
} from 'semantic-ui-react'

type NewArgumentProps = {
    doAdd: any
    doCancel: any
};

function NewArgument({ doCancel, doAdd }: NewArgumentProps) {
    const [parameter, setParameter] = useState('');
    const [dataType, setDataType] = useState('');
    const [inout, setInout] = useState('');
    const [input, setInput] = useState('');
    const [testResult, setTestResult] = useState(false);

    const submit = function () {
        doAdd({
            id: uuidv4(),
            parameter,
            dataType,
            inout,
            input,
            testResult,
            enabled:true,
        });

        setParameter('');
        setDataType('');
        setInout('');
        setInput('');
        setTestResult(false);
    };

    return (<Table.Row>
        <Table.Cell>
            <Form.Field
                control={Input}
                label=''
                placeholder=''
                value={parameter}
                onChange={(e: any) => setParameter(e.target.value)}
            />
        </Table.Cell>
        <Table.Cell>
            <Form.Field
                control={Select}
                options={[{ key: 'p', text: 'number', value: 'number' }, { key: 'f', text: 'varchar2', value: 'varchar2' }, { key: 'f', text: 'timestamp', value: 'timestamp' }, { key: 'f', text: 'date', value: 'date' }]}
                placeholder='DataType'
                value={dataType}
                onChange={(e: any, data: any) => setDataType(data.value)}
            />
        </Table.Cell>
        <Table.Cell>
            <Form.Field
                control={Select}
                options={[{ key: 'p', text: 'IN', value: 'IN' }, { key: 'f', text: 'OUT', value: 'OUT' }]}
                placeholder='IN'
                value={inout}
                onChange={(e: any, data: any) => setInout(data.value)}
            />
        </Table.Cell>
        <Table.Cell>
            <Form.Field
                control={Input}
                label=''
                placeholder=''
                value={input}
                width={6}
                onChange={(e: any) => setInput(e.target.value)}
            />
        </Table.Cell>
        <Table.Cell>
            <Checkbox
                toggle
                label=""
                checked={testResult}
                onChange={(e: any) => { setTestResult(e.target.checked); }}
            />
        </Table.Cell>
        <Table.Cell>
            <Button onClick={submit} icon='plus' color='green'/>
            <Button onClick={e => doCancel()} icon='close'/>
        </Table.Cell>
    </Table.Row>);
}

export default NewArgument;