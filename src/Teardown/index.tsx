import React, { useContext} from 'react';
import './styles.css';
import { PLSQL_CODE, TABLE_OR_ROW_RESTORE, TABLE_DROP } from '../constants';
import { ItemList } from '../Components/ItemList';
import { UnitTestContext } from '../context/UnitTestContext';
import { Container } from 'semantic-ui-react'

function Teardown() {
    const { teardowns, setTeardowns } = useContext(UnitTestContext);

    return (
        <Container fluid>
            <ItemList options={[TABLE_OR_ROW_RESTORE, PLSQL_CODE, TABLE_DROP]} items={teardowns} setmethod={setTeardowns}/>
        </Container>
    );
}

export default Teardown;
