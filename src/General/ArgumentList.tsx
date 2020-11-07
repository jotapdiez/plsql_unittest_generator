import React, { useContext, useState } from 'react';
import { Params } from '../constants';
import NewArgument from './NewArgument';
import { UnitTestContext } from '../context/UnitTestContext';
import {
    Checkbox,
    Button,
    Table,
} from 'semantic-ui-react'

type ArgumentListProps = {
    // arguments: Params[]
};

const ArgumentList = (props: ArgumentListProps) => {
    const { parameters, setParameters } = useContext(UnitTestContext);
    const [showNew, setShowNew] = useState(false);

    const addNewArgument = (param: Params) => {
        setParameters([...parameters, param]);
    };
    const cancelAddNew = () => {
        setShowNew(false);
    };

    return (<>
        <Button onClick={() => setShowNew(true)} icon='plus' color='green' />
        <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Parameter</Table.HeaderCell>
                <Table.HeaderCell>DataType</Table.HeaderCell>
                <Table.HeaderCell>In/Out</Table.HeaderCell>
                <Table.HeaderCell>Input/Result</Table.HeaderCell>
                <Table.HeaderCell>TestResult</Table.HeaderCell>
                <Table.HeaderCell>Habilitado</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {parameters.map(arg => {
                return (
                    <Table.Row key={arg.id}>
                        <Table.Cell>{arg.parameter}</Table.Cell>
                        <Table.Cell>{arg.dataType}</Table.Cell>
                        <Table.Cell>{arg.inout}</Table.Cell>
                        <Table.Cell>{arg.input}</Table.Cell>
                        <Table.Cell>
                            <Checkbox
                                toggle
                                label="Test Result"
                                defaultChecked={arg.testResult}/>
                        </Table.Cell>
                        <Table.Cell>
                            <Checkbox
                                toggle
                                label=""
                                defaultChecked={arg.enabled}
                            />
                        </Table.Cell>
                    </Table.Row>
                );
            })}
            {showNew ? (<NewArgument doCancel={cancelAddNew} doAdd={addNewArgument} />) : null}
            {parameters.length === 0 && !showNew ? (<Table.Row disabled><Table.Cell colSpan={6}>No hay parametros</Table.Cell></Table.Row>) : null}
        </Table.Body>
        </Table>
    </>);
    // return (
    //     <Container>
    //         <Button variant="link" onClick={() => setShowNew(true)}>
    //             <FontAwesomeIcon icon={faPlus} size="2x" color="green" />
    //         </Button>
    //         <Table striped bordered hover>
    //             <thead>
    //                 <tr>
    //                     <th>Parameter</th>
    //                     <th>DataType</th>
    //                     <th>In/Out</th>
    //                     <th>Input/Result</th>
    //                     <th>TestResult</th>
    //                     <th>Habilitado</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {parameters.map(arg => {
    //                     return (
    //                         <tr key={arg.id}>
    //                             <td>{arg.parameter}</td>
    //                             <td>{arg.dataType}</td>
    //                             <td>{arg.inout}</td>
    //                             <td>{arg.input}</td>
    //                             <td>
    //                                 <Form.Check
    //                                     type='switch'
    //                                     id="TestResult"
    //                                     label="Test Result"
    //                                     defaultChecked={arg.testResult}
    //                                 />
    //                             </td>
    //                             <td>
    //                                 <Form.Check
    //                                     type='switch'
    //                                     id="enabled"
    //                                     label=""
    //                                     defaultChecked={arg.enabled}
    //                                 />
    //                             </td>
    //                         </tr>
    //                     );
    //                 })}
    //                 {showNew ? (<NewArgument doCancel={cancelAddNew} doAdd={addNewArgument}/>) : null}
    //                 {parameters.length === 0 && !showNew ? (<tr>
    //                     <td colSpan={6}>No hay parametros</td>
    //                 </tr>)
    //                 : null}
    //             </tbody>
    //         </Table>
    //     </Container>
    // );
}
export default ArgumentList;