import React, { useContext } from 'react';
import './styles.css';
import { ItemList } from '../Components/ItemList';
import { TABLE_OR_ROW_COPY, PLSQL_CODE } from '../constants'
import { UnitTestContext } from '../context/UnitTestContext';
import { Container } from 'semantic-ui-react'

// const _items = [
//     {
//         id: 'asd',
//         label: 'Limpio errores y logs',
//         optionId: 'plsql',
//         content: 'BEGIN\n\tnull;\nEND;',
//     },
//     {
//         id: 'asd2',
//         label: 'Inserto los datos',
//         optionId: 'plsql',
//         content: 'BEGIN null END;',
//     }
// ]
function Startup() {
    const { startups, setStartups } = useContext(UnitTestContext);
    // const { startups } = useContext(UnitTestContext);

    return (
        <Container fluid>
            <ItemList options={[TABLE_OR_ROW_COPY, PLSQL_CODE]} items={startups} setmethod={setStartups}/>
        </Container>
    );
}

export default Startup;
