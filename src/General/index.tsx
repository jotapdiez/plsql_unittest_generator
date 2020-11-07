import React, { useContext} from 'react';
// import { Form } from 'react-bootstrap';
import {
    Checkbox,
    Form,
    Input,
    Select,
} from 'semantic-ui-react'
import './styles.css';
import { UnitTestContext } from '../context/UnitTestContext';
import ArgumentList from './ArgumentList'

function General() {
    const { nombre, setNombre } = useContext(UnitTestContext);
    const { owner, setOwner } = useContext(UnitTestContext);
    const { pkg, setPackage } = useContext(UnitTestContext);
    const { procedure, setProcedure } = useContext(UnitTestContext);
    const { expectedResult, setExpectedResult} = useContext(UnitTestContext);
    const { gatherStatistics, setGatherStatistics} = useContext(UnitTestContext);
    const { objType, setObjType } = useContext(UnitTestContext);

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    label='Nombre'
                    placeholder='Nombre'
                    onChange={(e: any, { value }: any) => setNombre(value)}
                    width={6}
                    value={nombre}
                />
                <Form.Field
                    control={Input}
                    label='Owner'
                    placeholder='Owner'
                    value={owner}
                    width={3}
                    onChange={(e:any) => setOwner(e.target.value)}
                />
                <Form.Field
                    control={Input}
                    label='Package'
                    placeholder='Package'
                    value={pkg}
                    width={6}
                    onChange={(e:any) => setPackage(e.target.value)}
                />
                <Form.Field
                    control={Input}
                    label='Procedure'
                    placeholder='Procedure'
                    value={procedure}
                    width={6}
                    onChange={(e:any) => setProcedure(e.target.value)}
                />
            </Form.Group>
                <Form.Group inline>
                    <Form.Field
                        control={Select}
                        label='Tipo'
                        options={[{ key: 'p', text: 'PROCEDURE', value: 'procedure' }, { key: 'f', text: 'FUNCTION', value: 'function' }]}
                        placeholder='Tipo'
                        value={objType}
                        onChange={(e: any, data:any) => setObjType(data.value)}
                    />
                <Form.Field
                    control={Select}
                    label='Expected Result'
                    options={[{ key: 'p', text: 'Success', value: 'success' }, { key: 'f', text: 'Exception', value: 'exception' }]}
                    placeholder='Expected Result'
                    value={expectedResult}
                    onChange={(e: any, data:any) => setExpectedResult(data.value)}
                />
                {expectedResult === 'exception' ? (
                <Form.Field
                    control={Input}
                    label='Expected Err Number o "ANY"'
                    placeholder='Expected Err Number o "ANY"'
                    onChange={(e:any) => setProcedure(e.target.value)}
                    value={procedure}
                />
            ) : null}
                <Checkbox toggle label="Gather Code Coverage Statistics" checked={gatherStatistics} onChange={(e: any) => { console.log(e.target); setGatherStatistics(e.target.checked) }}/>
            </Form.Group>
            <span>Parametros:</span>
            <ArgumentList/>
        </Form>
    );
}

export default General;
